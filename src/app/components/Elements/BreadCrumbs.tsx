'use client'
import { useEffect, useState } from 'react'
import BreadCrumbItem from './BreadCrumbItem'

interface Folder {
    name: string,
    folderID: string
}

const getCrumbs = async (folderID: string) => {
    if (!folderID) {
        return []
    } else {
        try {
            const response = await fetch(`/api/folders/${folderID}`, {
                method: "GET"
            })

            const data = await response.json();
            return data.ancestors;
        } catch (error) {
            console.log(error)
        }
    }
}

const BreadCrumbs: React.FC<{ name: string, folderID: string }> = ({ name, folderID }) => {
    const [crumbs, setCrumbs] = useState<Folder[]>([]);

    useEffect(() => {
        const fetchCrumbs = async () => {
            const fetchedCrumbs = await getCrumbs(folderID);
            setCrumbs(fetchedCrumbs);
        };

        fetchCrumbs();
    }, [folderID]);

    return (
        <>{folderID ?
            <div className="-ml-5 pt-5 flex">
                <BreadCrumbItem name={"My Drive"} url={"/dashboard"} isActive={false} folderID={null}/>
                {crumbs.map((folder: Folder) => (
                    <BreadCrumbItem
                        name={folder.name}
                        url={`/dashboard/folders/${folder.folderID}`}
                        isActive={false}
                        folderID={folder.folderID}
                        key={folder.folderID}
                    />
                ))}
                <BreadCrumbItem name={name} url={`/dashboard/folders/${folderID}`} isActive={true} folderID=''/>
            </div>
            :
            <div className="-ml-5 pt-5 flex">
                <BreadCrumbItem name={name} url={`/dashboard/folders/${folderID}`} isActive={true} folderID=''/>
            </div>
        }</>
    );
};

export default BreadCrumbs;
