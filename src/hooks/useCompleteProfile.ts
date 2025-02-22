import {
  CheckPhoneEmailExistence,
  storeBusinessUserDetails,
  storeBusinessUserDetailsCategories,
  storeBusinessUserDetailsServices,
  storeSuggestedServices,
} from "@/services/CompleteProfile";
import {
  BusinessUserDetailsCategoriesStore,
  BusinessUserDetailsServicesStore,
  CompleteProfile,
  PhoneEmailExistenceCheckData,
  PhoneEmailExistenceCheckResponse,
  SuggestedServicesStore,
} from "@/types/CompleteProfile";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

function generateBusinessUserDetailsFormData(profile: CompleteProfile) {
  const businessUserDetails = new FormData();

  const appendIfDefined = (key: string, value: any) => {
    if (value !== undefined && value !== null && value !== "") {
      businessUserDetails.append(key, value);
    }
  };

  appendIfDefined("business_name", profile.business_name);
  appendIfDefined("business_email", profile.business_email);
  appendIfDefined("phone", profile.phone);
  appendIfDefined("years_of_experience", profile.years_of_experience);
  appendIfDefined("number_of_employees", String(profile.number_of_employees));
  appendIfDefined("volume_of_work", String(profile.volume_of_work));
  appendIfDefined("price_range", String(profile.price_range));
  appendIfDefined("city_id", String(profile.city_id));
  appendIfDefined("profile", profile.profile);
  appendIfDefined("logo", profile.logo);
  appendIfDefined("lang", String(profile.lang));
  appendIfDefined("lat", String(profile.lat));

  if (profile.classifications) {
    profile.classifications.forEach((classification, index) => {
      appendIfDefined(`classifications[${index}]`, classification);
    });
  }

  appendIfDefined("business_desc_en", profile.business_desc_en);
  appendIfDefined("business_desc_ar", profile.business_desc_ar);
  appendIfDefined("hotline", String(profile.hotline));
  appendIfDefined("user_id", String(profile.user_id));

  if (profile.files) {
    profile.files.forEach(({ file, type }, index) => {
      if (file instanceof File) {
        appendIfDefined(`files[${index}][file]`, file);
        appendIfDefined(`files[${index}][type]`, String(type));
      } else {
        console.error(`File at index ${index} is not a valid File object.`);
      }
    });
  }

  return businessUserDetails;
}

export const mapCompleteProfileToStores = (profile: CompleteProfile) => {
  const businessUserDetails = generateBusinessUserDetailsFormData(profile);

  const businessUserCategories: BusinessUserDetailsCategoriesStore[] =
    profile.categories.map((category) => ({
      user_id: profile.user_id!,
      category_id: category.value as number,
    }));

  const businessUserServices: BusinessUserDetailsServicesStore[] =
    profile.services.flatMap((serviceGroup) =>
      serviceGroup.services.map((service) => ({
        user_id: profile.user_id!,
        service_id: service.value as number,
      }))
    );

  const suggestedService: SuggestedServicesStore | null =
    profile.suggestService;

  return {
    businessUserDetails,
    businessUserCategories,
    businessUserServices,
    suggestedService,
  };
};

export const useCheckPhoneEmailExistence = () => {
  return useMutation<
    PhoneEmailExistenceCheckResponse,
    Error,
    PhoneEmailExistenceCheckData
  >({
    mutationFn: CheckPhoneEmailExistence,
  });
};

export const useBusinessProfileFlow = (values: CompleteProfile) => {
  const {
    businessUserDetails,
    businessUserCategories,
    businessUserServices,
    suggestedService,
  } = mapCompleteProfileToStores(values);

  const { mutate: mutateCategories, isPending: isCategoriesLoading } =
    useMutation({
      mutationFn: storeBusinessUserDetailsCategories,
    });

  const { mutate: mutateServices, isPending: isServicesLoading } = useMutation({
    mutationFn: storeBusinessUserDetailsServices,
  });

  const {
    mutate: mutateSuggestedServices,
    isPending: isSuggestedServicesLoading,
  } = useMutation({
    mutationFn: storeSuggestedServices,
  });

  const { mutate: mutateDetails, isPending: isDetailsLoading } = useMutation({
    mutationFn: () => {
      return storeBusinessUserDetails(businessUserDetails);
    },
    onSuccess: () => {
      let successCount = 0;
      const requiredSuccesses = values.suggestService ? 3 : 2;

      const checkCompletion = () => {
        successCount += 1;
        if (successCount === requiredSuccesses) {
          window.location.href = "/login";
          Cookies.remove("signUpToken");
          Cookies.remove("authToken");
        }
      };
      toast.info("business_profile_form.success_message");

      mutateCategories(businessUserCategories, {
        onSuccess: checkCompletion,
      });
      mutateServices(
        { services: businessUserServices },
        { onSuccess: checkCompletion }
      );
      if (suggestedService) {
        mutateSuggestedServices(suggestedService, {
          onSuccess: checkCompletion,
        });
      }
    },
  });

  const isLoading =
    isDetailsLoading ||
    isCategoriesLoading ||
    isServicesLoading ||
    isSuggestedServicesLoading;

  return {
    mutateBusinessProfile: mutateDetails,
    isLoading,
  };
};
