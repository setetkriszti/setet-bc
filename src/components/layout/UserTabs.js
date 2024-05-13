"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function UserTabs({ isAdmin }) {
  const path = usePathname();
  return (
    <div className="flex mx-auto mb-8 gap-2 tabs justify-center flex-wrap">
      <Link className={path === "/profile" ? "active" : ""} href={"/profile"}>
        Adatlap
      </Link>
      {isAdmin && (
        <>
          <Link
            className={path === "/categories" ? "active" : ""}
            href={"/categories"}
          >
            Kategóriák
          </Link>
          <Link
            className={/menu-items/.test(path) ? "active" : ""}
            href={"/menu-items"}
          >
            Étlap
          </Link>
          <Link
            className={path.includes("/users") ? "active" : ""}
            href={"/users"}
          >
            Felhasználók
          </Link>
          <Link className={path === "/feedbacks" ? "active" : ""}
            href={"/feedbacks"}>
              Visszajelzések
          </Link>
        </>
      )}
      <Link className={path === "/orders" ? "active" : ""} href={"/orders"}>
        Rendelések
      </Link>
    </div>
  );
}
