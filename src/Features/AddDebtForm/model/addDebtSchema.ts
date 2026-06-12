import { z } from "zod";

const amountSchema = z
  .string()
  .trim()
  .min(1, "Amount is required")
  .refine(
    (value) => Number.isFinite(Number(value)) && Number(value) >= 0,
    "Enter a valid amount",
  );

export const addDebtSchema = z
  .object({
    debtorName: z.string().trim().min(2, "Enter the debtor name"),
    debtorInfo: z.string().trim().optional(),
    debtAmount: amountSchema,
    refundAmount: amountSchema,
    debtDate: z.string().trim(),
    dueDate: z.string().trim(),
    withoutDetails: z.boolean(),
    isReturned: z.boolean(),
  })
  .superRefine((values, context) => {
    if (Number(values.refundAmount) > Number(values.debtAmount)) {
      context.addIssue({
        code: "custom",
        message: "Refund amount cannot exceed debt amount",
        path: ["refundAmount"],
      });
    }

    if (!values.withoutDetails && !values.debtDate) {
      context.addIssue({
        code: "custom",
        message: "Select the debt date",
        path: ["debtDate"],
      });
    }

    if (!values.withoutDetails && !values.dueDate) {
      context.addIssue({
        code: "custom",
        message: "Select the due date",
        path: ["dueDate"],
      });
    }

    if (values.debtDate && values.dueDate && values.dueDate < values.debtDate) {
      context.addIssue({
        code: "custom",
        message: "Due date cannot be earlier than debt date",
        path: ["dueDate"],
      });
    }
  });

export type AddDebtFormValues = z.infer<typeof addDebtSchema>;

export const addDebtFormDefaultValues: AddDebtFormValues = {
  debtorName: "",
  debtorInfo: "",
  debtAmount: "",
  refundAmount: "",
  debtDate: "",
  dueDate: "",
  withoutDetails: false,
  isReturned: false,
};
