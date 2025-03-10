import React from "react";
import ServiceCard from "@/components/molecules/ServiceCard/ServiceCard";
import { Service } from "@/types/Services";

const ServiceGrid: React.FC<any> = ({ services, userType }) => {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 py-10 h-auto">
      {services?.map((service: Service) => (
        <ServiceCard key={service.id} service={service} userType={userType} />
      ))}
    </div>
  );
};

export default ServiceGrid;
