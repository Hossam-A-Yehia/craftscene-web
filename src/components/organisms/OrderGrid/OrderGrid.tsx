import NoData from "@/components/molecules/NoDate/NoDate";
import OrderCard from "@/components/molecules/OrderCard/OrderCard";
import { Order } from "@/types/Orders";
import React from "react";

export default function OrderGrid({
  filteredOrders,
  isLoading,
  isIncomingOrders,
}: {
  filteredOrders: Order[];
  isLoading: boolean;
  isIncomingOrders?: boolean;
}) {
  return (
    <div data-testid="order-grid">
      {filteredOrders?.length > 0 ? (
        filteredOrders?.map((order) => (
          <OrderCard
            isIncomingOrders={isIncomingOrders}
            key={order.id}
            id={order.id}
            status={order.status}
            total={order.total_price}
            supplierName={order.supplier_name}
            clientName={order.client_name}
          />
        ))
      ) : (
        <>
          {!isLoading && (
            <div className="text-center pt-5" data-testid="no-data-container">
              <NoData />
            </div>
          )}
        </>
      )}
    </div>
  );
}
