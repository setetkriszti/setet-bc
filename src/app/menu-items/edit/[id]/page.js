'use client';
import { useProfile } from "@/components/UseProfile";
import UserTabs from "@/components/layout/UserTabs";
import { useEffect, useState } from "react";
import toast from "react-hot-toast"
import Link from "next/link";
import Left from "@/components/icons/Left";
import { redirect, useParams } from "next/navigation"
import MenuItemForm from "@/components/layout/MenuItemForm";
import DeleteButton from "@/components/DeleteButton";

export default function EditMenuItemPage(){

    const {id} = useParams();
    const [menuItem, setMenuItem] = useState(null);
    const {loading, data} = useProfile();
    const [redirectToItems, setRedirectToItems] = useState(false);

    useEffect(() => {
        fetch('/api/menu-items').then(res => {
            res.json().then(items => {
                const item = items.find(i => i._id === id);
                setMenuItem(item);
            });
        })
    }, []);

    async function handleFormSubmit(ev, data){
        ev.preventDefault();
        data = {...data, _id:id};
        const savingPromise = new Promise(async (resolve, reject) => {
            const response = await fetch('/api/menu-items', {
                method: 'PUT',
                body: JSON.stringify(data),
                headers: { 'Content-Type': 'application/json'},
            });
            if (response.ok)
                resolve();
            else
                reject();
        });
        await toast.promise (savingPromise , {
            loading: 'Mentés...',
            success: 'Sikeresen elmentve',
            error: 'Hiba!',
        });        
        setRedirectToItems(true);
    }

    async function handleDeleteClick() {
        const promise = new Promise(async (resolve, reject) => {
          const res = await fetch('/api/menu-items?_id='+id, {
            method: 'DELETE',
          });
          if (res.ok)
            resolve();
          else
            reject();
        });
        await toast.promise(promise, {
          loading: 'Törlés...',
          success: 'Törölve!',
          error: 'Hiba!',
        });
        setRedirectToItems(true);
    }

    if (redirectToItems){
        return redirect('/menu-items');
    }

    if(loading) {
        return 'Betöltés';
    }
    if(!data.admin){
        return 'Hiba!';
    }

    return(
        <section className="mt-8">
            <UserTabs isAdmin={true}/>
            <div className="max-w-md mx-auto mt-8">
                <Link className="button"
                    href={'/menu-items'}>
                    <Left />
                    <span>Összes menü</span>
                </Link>
            </div>
            <MenuItemForm menuItem={menuItem} onSubmit={handleFormSubmit} />
            <div className="max-w-md mx-auto mt-2">
                <div className="max-w-xs ml-auto">
                    <DeleteButton 
                        label="Menü törlése" 
                        onDelete={handleDeleteClick}
                    />
                </div>
            </div>
        </section>
    );
}