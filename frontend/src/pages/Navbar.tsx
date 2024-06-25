import {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
} from "@headlessui/react";
import * as UserAPI from "../api/userAPI";
import { useNavigate } from "react-router-dom";

const navigation = [
    // { name: "Dashboard", href: "#", current: true },
    // { name: "Team", href: "#", current: false },
    // { name: "Projects", href: "#", current: false },
    // { name: "Calendar", href: "#", current: false },
];

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
    const navigate = useNavigate();

    const onLogoutSuccessful = () => {
        navigate("/login");
    };

    async function logout() {
        try {
            await UserAPI.logout();
            onLogoutSuccessful();
        } catch (error) {
            console.error(error);
            alert(error);
        }
    }

    return (
        <Disclosure
            as="nav"
            className="fixed z-40 top-0 left-0 right-0 bg-white border-b"
        >
            {() => (
                <>
                    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                        <div className="relative flex h-16 items-center justify-between">
                            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden"></div>
                            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start"></div>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                <p>username</p>
                                <Menu as="div" className="relative ml-3">
                                    <div>
                                        <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                            <span className="absolute -inset-1.5" />
                                            <span className="sr-only">
                                                Open user menu
                                            </span>
                                            <img
                                                className="h-8 w-8 rounded-full"
                                                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                                alt=""
                                            />
                                        </MenuButton>
                                    </div>
                                    <MenuItems
                                        transition
                                        className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                                    >
                                        <MenuItem>
                                            {({ focus }) => (
                                                <a
                                                    href="#"
                                                    className={classNames(
                                                        focus
                                                            ? "bg-gray-100"
                                                            : "",
                                                        "block px-4 py-2 text-sm text-gray-700"
                                                    )}
                                                >
                                                    Edit Profile
                                                </a>
                                            )}
                                        </MenuItem>
                                        {/* <MenuItem>
                                            {({ focus }) => (
                                                <a
                                                    href="#"
                                                    className={classNames(
                                                        focus
                                                            ? "bg-gray-100"
                                                            : "",
                                                        "block px-4 py-2 text-sm text-gray-700"
                                                    )}
                                                >
                                                    Settings
                                                </a>
                                            )}
                                        </MenuItem> */}
                                        <MenuItem>
                                            {({ focus }) => (
                                                <button
                                                    onClick={logout}
                                                    className={classNames(
                                                        focus
                                                            ? "bg-gray-100"
                                                            : "",
                                                        "block px-4 py-2 text-sm text-gray-700 w-full text-left"
                                                    )}
                                                >
                                                    Log out
                                                </button>
                                            )}
                                        </MenuItem>
                                    </MenuItems>
                                </Menu>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </Disclosure>
    );
}
