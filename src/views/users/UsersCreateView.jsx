import React, { useState, useEffect } from "react";
import Header from "../../components/Header";

export default function UsersCreateView() {
    const linkPath = ["/dashboard", "/users", "/users/create"];
    const [user, setUser] = useState({
        username: "",
        password: "",
        role: "user",
        lastConnection: "",
    });

    const handleInputChange = (fieldName, value) => {
        setUser((prevUser) => ({
            ...prevUser,
            [fieldName]: value,
        }));
    };

    const handleFormSubmit = async () => {
        try {
            var userFormData = new FormData();
            var requestOptions = {
                method: "POST",
                body: userFormData,
                redirect: "follow",
            };

            userFormData.append("username", user.username);
            userFormData.append("password", user.password);
            userFormData.append("role", user.role);
            userFormData.append("lastConnection", user.lastConnection);

            const userResponse = await fetch(
                "http://localhost:8080/antstorage/v1/users",
                requestOptions
            );
            const userResult = await userResponse.json();

            // Open a new window after all requests have been completed successfully
            window.location.assign(`/users/`);
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };

    return (
        <>
            <Header
                viewName={"New User"}
                productCountChip={false}
                visualPath={"Dashboard / Users / New user"}
                linkPath={linkPath}
            />
            <main className="relative p-5">
                <div className="form w-[450px] p-4 mx-auto text-left">
                    <label htmlFor="" className="font-semibold text-sm">
                        Username
                    </label>
                    <input
                        className="text-[#E39945] block font-bold text-lg outline-none mb-4 border-b border-gray-300 w-full"
                        type="text"
                        onChange={(e) =>
                            handleInputChange("username", e.target.value)
                        }
                        placeholder="Username"
                        id="name"
                    />

                    <label htmlFor="" className="font-semibold text-sm">
                        Password
                    </label>
                    <input
                        className="text-[#E39945] block font-bold text-lg outline-none mb-4 border-b border-gray-300 w-full"
                        type="password"
                        onChange={(e) =>
                            handleInputChange("password", e.target.value)
                        }
                        placeholder="Password"
                        id="password"
                    />
                    <div className="text-center">
                        <button onClick={handleFormSubmit} className="bg-[#E39945] py-1 px-4 text-white rounded text-lg my-3">
                            Create
                        </button>
                    </div>
                </div>
            </main>
        </>
    );
}
