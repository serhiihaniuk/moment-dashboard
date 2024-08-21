"use client";
import { useState, FormEvent } from "react";

type TicketGrade = "FAN" | "VIP" | "Premium";

interface TicketModalProps {
  buttonText: string;
}

export default function TicketModal({ buttonText }: TicketModalProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [instagram, setInstagram] = useState<string>("");
  const [grade, setGrade] = useState<TicketGrade>("FAN");

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const response = await fetch("/api/stripe_hook/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        phone,
        instagram,
        grade,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Ticket added:", data);

      setName("");
      setEmail("");
      setPhone("");
      setInstagram("");
      setGrade("FAN");
      setIsLoading(false);

      closeModal();
    } else {
      console.error("Failed to add ticket");
    }
  };

  return (
    <>
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={openModal}
      >
        {buttonText}
      </button>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-4 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Add Ticket</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border rounded"
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded"
              />
              <input
                type="text"
                placeholder="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-2 border rounded"
              />
              <input
                type="text"
                placeholder="Instagram"
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)}
                className="w-full px-4 py-2 border rounded"
              />
              <select
                value={grade}
                onChange={(e) => setGrade(e.target.value as TicketGrade)}
                className="w-full px-4 py-2 border rounded"
              >
                <option value="FAN">FAN</option>
                <option value="VIP">VIP</option>
                <option value="Premium">Premium</option>
              </select>
              <button
                type="submit"
                className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                disabled={isLoading}
              >
                {isLoading && "..."} Add Ticket
              </button>
            </form>
            <button
              className="mt-4 w-full px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
