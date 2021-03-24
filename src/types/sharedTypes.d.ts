export interface ClientBillPaymentBody extends BillPayment {
    accountId?: string,
    ssnSignature? : string | undefined
}

export interface ClientTransactionApprovalStatus extends TransactionApprovalStatus {}

export interface ClientUserData extends UserData {}

declare global {
    type BillPaymentBody = ClientBillPaymentBody

    type BillPayment = {
        assetId?: string,
        selectedAssetLabel?: string,
        savedPayeeId?: string,
        payable_to?: string,
        amount?: number,
        payment_memo?: string,
        process_date?: string,
        bill_payment_type?: string,
        expense_type?: string,
        tax_year?: string,
        full_or_partial?: string,
        delivery_method?: string,
        mailing_street?: string,
        mailing_city?: string,
        mailing_state?: string,
        mailing_zip?: string,
        c_o?: string,
        routing_number?: string,
        bank_name?: string,
        credit_name?: string,
        credit_account_number?: string,
        credit_account_type?: string,
        swift_code?: string,
        bank_street?: string,
        bank_city?: string,
        country_code?: string,
        beneficiary_name?: string,
        beneficiary_account_number?: string,
        payment_details?: string,
        corresponding_bank?: string,
        edit_payee?: boolean | undefined,
        ssnSigFirstThree? : string,
        ssnSigNextTwo?: string,
        files?: Array<SFFile>,
        failedIdAttempts?: number
    }

    type PersonAccount = {
        id: string,
        name: string
    }

    type SFFile = {
        name?: string,
        base64_string?: string
    }

    type TransactionApprovalStatus = {
        transactionId?: string,
        rejectionReason?: string,
        fullOrPartial?: string,
        expectedUseOfFunds?: string
    }
      
    type UserData = {
        personAccountId?: string,
        personContactId?: string,
        ipAddress?: string
    }
}