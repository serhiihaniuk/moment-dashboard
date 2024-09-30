"use client";
import { useState, FormEvent } from "react";

type TicketGrade = "fan" | "vip" | "premium";

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
  const [grade, setGrade] = useState<TicketGrade>("fan");

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

      // Reset form values after submission
      setName("");
      setEmail("");
      setPhone("");
      setInstagram("");
      setGrade("fan");
      setIsLoading(false);
      closeModal();
    } else {
      console.error("Failed to add ticket");
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
        onClick={openModal}
      >
        {buttonText}
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Добавить билет
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Имя
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Телефон
                </label>
                <input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 focus:outline-none"
                />
              </div>

              <div>
                <label
                  htmlFor="instagram"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Instagram
                </label>
                <input
                  id="instagram"
                  type="text"
                  value={instagram}
                  onChange={(e) => setInstagram(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 focus:outline-none"
                />
              </div>

              <div>
                <label
                  htmlFor="grade"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Уровень билета
                </label>
                <select
                  id="grade"
                  value={grade}
                  onChange={(e) => setGrade(e.target.value as TicketGrade)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 focus:outline-none"
                >
                  <option value="fan">Fan</option>
                  <option value="vip">VIP</option>
                  <option value="premium">Premium</option>
                </select>
              </div>

              <button
                type="submit"
                className={`w-full px-4 py-2 text-white rounded-lg ${
                  isLoading ? "bg-blue-300" : "bg-blue-500 hover:bg-blue-600"
                } focus:outline-none focus:ring-2 focus:ring-blue-300`}
                disabled={isLoading}
              >
                {isLoading ? "Добавление..." : "Добавить билет"}
              </button>
            </form>

            <button
              className="mt-4 w-full px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
              onClick={closeModal}
            >
              Закрыть
            </button>
          </div>
        </div>
      )}
    </>
  );
}
