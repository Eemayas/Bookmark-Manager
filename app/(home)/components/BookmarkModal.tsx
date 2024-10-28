import {
  Modal,
  ModalBody,
  ModalContent,
  ModalTrigger,
} from "@/components/ui/animated-modal";
import { InputField, TextAreaField } from "@/components/CustomsInputs";
import { useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";

function BookmarkModal() {
  const { user } = useUser();
  const [formData, setFormData] = useState({
    name: "",
    link: "",
    tags: "",
    folder_path: "",
    description: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log("Dvsdvs");
    e.preventDefault();
    console.log("Form submitted", formData);
    const tempWebsite = {
      ...formData,
      email_address: user?.email,
    };
    console.log({ tempWebsite });
    try {
      const response = await fetch("http://localhost:3000/api/website", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(tempWebsite), // Use tempWebsite instead of website
      });

      if (!response.ok) {
        console.log({ response });
        throw new Error(`Error: ${response.statusText}`); // Handle error response
      }
      const data = await response.json(); // Assuming the API returns JSON
      console.log("Success:", data); // Log success message
    } catch (error) {
      console.error("Failed to add websites:", error); // Log error message
    }
  };

  return (
    <div className="flex items-center justify-center py-40">
      <Modal>
        <ModalTrigger className="group/modal-btn fixed bottom-6 right-10 flex justify-center rounded-full bg-blue-600 text-white transition duration-200 ease-in-out hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300">
          <svg
            className="-ms-1 me-1 h-5 w-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
              clipRule="evenodd"
            ></path>
          </svg>
        </ModalTrigger>
        <ModalBody>
          <ModalContent>
            <h4 className="mb-8 text-center text-lg font-bold text-neutral-600 md:text-2xl dark:text-neutral-100">
              Add New Bookmark
            </h4>{" "}
            <form className="mt-4" onSubmit={handleFormSubmit}>
              <div className="mb-4 grid grid-cols-2 gap-4">
                <InputField
                  label="Name"
                  name="name"
                  placeholder="Type product name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
                <InputField
                  label="Link"
                  name="link"
                  placeholder="Type product link"
                  value={formData.link}
                  onChange={handleInputChange}
                />
                <InputField
                  label="Tags"
                  name="tags"
                  placeholder="Type product tags"
                  value={formData.tags}
                  onChange={handleInputChange}
                />
                <InputField
                  label="Folder Path"
                  name="folder_path"
                  placeholder="Type folder path"
                  value={formData.folder_path}
                  onChange={handleInputChange}
                />
                <TextAreaField
                  label="Product Description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                />
              </div>
              <button
                onSubmit={(e) => {
                  e.preventDefault();
                  console.log("SDvsdv");
                }}
                type="submit"
                className="mt-4 w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700"
              >
                Add new Bookmark
              </button>
            </form>
          </ModalContent>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default BookmarkModal;
