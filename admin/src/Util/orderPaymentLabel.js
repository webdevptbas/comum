const getPaymentLabel = (status) => {
  switch (status) {
    case "settlement":
      return "Paid";

    case "pending":
      return "Pending";

    case "expire":
      return "Expired";

    case "cancel":
      return "Cancelled";

    default:
      return status;
  }
};

export default getPaymentLabel;
