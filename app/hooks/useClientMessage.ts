import { useFeedback } from "~/components/Feedback";
import { useGAlert } from "~/components/GAlert";
import { isDataResponse } from "~/data-response";

const useClientMessage = () => {
  const feedback = useFeedback();
  async function handle(data: any) {
    if (!data) {
      return;
    }

    if (!isDataResponse(data)) {
      return;
    }

    if (data.statusCode >= 200 && data.statusCode <= 299) {
      return;
    }

    feedback.showAlertDialog({
      key: "error",
      title: "Warning",
      message: data.data,
    });
  }

  return { handle };
};

export default useClientMessage;
