import React from "react";
import { t } from "i18next";
import Button from "@/components/atoms/Button/Button";
import { Form, Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import { useQueryClient } from "@tanstack/react-query";
import { useMutateAcceptOrder } from "@/hooks/useOrders";
import { toast } from "react-toastify";
import FormField from "../../FormField/FormField";

type ProductDetails = {
  id: number;
};

type FormValues = {
  deliveryDate: string;
  shipping: string;
};

type ModalContentProps = {
  onConfirm: () => void;
  onCancel: () => void;
  selectedProductIds: number[];
  productsDetails: ProductDetails[];
  orderId: string;
};

const AcceptOrderModalContent = ({
  onConfirm,
  onCancel,
  selectedProductIds,
  productsDetails,
  orderId,
}: ModalContentProps) => {
  const queryClient = useQueryClient();

  const validationSchema = Yup.object().shape({
    deliveryDate: Yup.date().required(
      "order.order_details.delivery_date_required"
    ),
    shipping: Yup.string().required("order.order_details.shippling_required"),
  });

  const { mutateAsync: AcceptAsync, isPending: isPendingComplated } =
    useMutateAcceptOrder();

  const handleSubmit = async (
    values: FormValues,
    { setSubmitting }: FormikHelpers<FormValues>
  ) => {
    try {
      const structureData = {
        orderId,
        delivery_date: values.deliveryDate,
        shipping: values.shipping,
        ...(selectedProductIds.length !== productsDetails.length && {
          items: selectedProductIds,
        }),
      };
      await AcceptAsync(structureData);
      queryClient.invalidateQueries({ queryKey: ["supplier-order-details"] });
      toast.info(t("order.order_details.accept_massage"));
      onConfirm();
    } catch (err: any) {
      toast.error(err.response?.data?.message || "An error occurred");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="p-8 space-y-6 bg-white rounded-lg shadow-lg max-w-lg mx-auto transition-all transform scale-100 hover:scale-105"
      data-testid="address-modal-content"
    >
      <Formik
        initialValues={{ deliveryDate: "", shipping: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ touched, errors, values, isSubmitting }) => (
          <Form>
            <div className="gap-4 flex flex-col">
              <FormField
                id="shipping"
                label={t("order.order_details.shippling")}
                type="text"
                name="shipping"
                placeholder={t("Enter shipping")}
                touched={touched.shipping}
                errors={errors.shipping}
                value={values.shipping}
                dataTestid="shipping-order"
              />
              <FormField
                id="deliveryDate"
                label={t("order.order_details.delivery_date")}
                type="date"
                name="deliveryDate"
                placeholder={t("order.order_details.delivery_date_placeholder")}
                touched={touched.deliveryDate}
                errors={errors.deliveryDate}
                value={values.deliveryDate}
                dataTestid="delivery-date"
              />
            </div>
            <div className="flex justify-around space-x-4 mt-6">
              <Button
                variant="secondary"
                onClick={onCancel}
                dataTestid="cancel-button"
                type="button"
              >
                {t("order.checkout.cancel")}
              </Button>
              <Button
                dataTestid="confirm"
                variant="delete"
                type="submit"
                disabled={isSubmitting || isPendingComplated}
              >
                {t("order.checkout.confirm")}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AcceptOrderModalContent;
