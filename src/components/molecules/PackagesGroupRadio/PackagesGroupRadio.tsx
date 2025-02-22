import React from "react";
import { Field, FieldProps } from "formik";
import { FaCircleCheck, FaXmark, FaCheck } from "react-icons/fa6";

interface Feature {
  text: string;
  enabled: boolean;
}

interface PackageType {
  value: number;
  label: string;
  price: number;
  description?: string;
  features: Feature[];
}

interface RadioGroupProps {
  options: PackageType[];
  name: string;
  label?: string;
  error?: string;
  touched?: boolean;
  required?: boolean;
}

const PackagesGroupRadio: React.FC<RadioGroupProps> = ({
  options,
  name,
  label,
  error,
  touched,
  required,
}) => (
  <Field name={name}>
    {({ field, form }: FieldProps) => (
      <div className="flex flex-col gap-4">
        {label && (
          <label className="text-lg font-semibold text-gray-900">
            {label}
            {required && <span className="text-red-500">*</span>}
          </label>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {options.map((option) => (
            <div key={option.value} className="flex flex-col">
              <input
                type="radio"
                id={String(option.value)}
                name={name}
                value={option.value}
                className="hidden peer"
                checked={field.value === option.value}
                onChange={(e) => {
                  form.setFieldValue(name, Number(e.target.value));
                }}
              />
              <label
                htmlFor={String(option.value)}
                className="h-full flex flex-col border border-gray-200 rounded-xl transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 hover:border-blue-300 cursor-pointer"
              >
                <div className="p-6 flex flex-col gap-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-bold text-gray-900">
                      {option.label}
                    </h3>
                    <FaCircleCheck
                      className={`w-6 h-6 text-blue-500 transition-opacity duration-200 ${
                        field.value === option.value
                          ? "opacity-100"
                          : "opacity-0"
                      }`}
                    />
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold text-gray-900">
                      ${option.price.toFixed(2)}
                    </span>
                    <span className="text-gray-600 text-sm">
                      /month after trial ends
                    </span>
                  </div>
                  {option.description && (
                    <p className="text-sm text-gray-600">
                      {option.description}
                    </p>
                  )}
                </div>
                <div className="border-t border-gray-200 p-6">
                  <ul className="space-y-3">
                    {option.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        {feature.enabled ? (
                          <FaCheck className="w-5 h-5 text-green-500 mt-0.5" />
                        ) : (
                          <FaXmark className="w-5 h-5 text-gray-400 mt-0.5" />
                        )}
                        <span
                          className={`text-sm ${
                            feature.enabled ? "text-gray-900" : "text-gray-500"
                          }`}
                        >
                          {feature.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </label>
            </div>
          ))}
        </div>
        {error && touched && (
          <p className="text-sm text-red-500 mt-2">{error}</p>
        )}
      </div>
    )}
  </Field>
);

export default PackagesGroupRadio;
