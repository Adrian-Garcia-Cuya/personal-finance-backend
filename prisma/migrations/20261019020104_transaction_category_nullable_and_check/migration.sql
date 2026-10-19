-- AlterTable
ALTER TABLE "transactions" ALTER COLUMN "category_id" DROP NOT NULL;

ALTER TABLE "transactions"
ADD CONSTRAINT "chk_transaction_type_fields" CHECK (
    (
        "type" = 'transfer'
        AND "category_id" IS NULL
        AND "to_account_id" IS NOT NULL
        AND "to_account_id" <> "account_id"
    )
    OR
    (
        "type" IN ('income', 'expense')
        AND "category_id" IS NOT NULL
        AND "to_account_id" IS NULL
    )
)
