export{}
declare global {
    type BillPaymentActions = setBillPayment | resetBillPayment;
}

type setBillPayment = {
    type: "setBillPayment",
    payload: Partial<BillPayment>
}

type resetBillPayment = {
    type: "resetBillPayment"
}