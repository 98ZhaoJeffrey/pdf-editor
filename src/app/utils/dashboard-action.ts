export async function deleteFolder(folderID: string) {
    try {
        await fetch(`/api/folders/${folderID}`, {
            method: 'DELETE',
        });
    } catch (error) {
        console.log(error)
    }
}

export async function deleteFile(fileID: string) {
    try {
        await fetch(`/api/files/${fileID}`, {
            method: 'DELETE',
        });
    } catch (error) {
        console.log(error)
    }
}

export async function changeFolderName(folderName: string, folderID: string) {
    const data = { name: folderName }
    const response = await fetch(`/api/folders/${folderID}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        alert("Something went wrong, please try again")
    }
    return await response.json();
}

export async function changeFileName(fileName: string, fileID: string) {
    const data = { name: fileName }
    const response = await fetch(`/api/files/${fileID}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        alert("Something went wrong, please try again")
    }
    return await response.json();
}


export async function downloadFile(fileID: string, fileName: string) {
    const response = await fetch(`api/files/${fileID}`, {
        method: 'GET'
    })

    if (response.ok) {
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);

        // Create a link element and simulate a click to trigger the download
        const link = document.createElement('a');
        link.href = url;
        fileName.includes(".pdf") ? link.download = fileName : link.download = `${fileName}.pdf`
        link.click();

        // Clean up by revoking the object URL
        URL.revokeObjectURL(url);
    } else {
        console.error('Error downloading file:', response.statusText);
    }
}

export async function changeFolderParent(parentFolderID: string, folderID: string, extract: boolean) {
    let data;
    if (parentFolderID === 'null'){
        return
    }
    if (extract) {
        const response = await fetch(`/api/folders/${parentFolderID}`, {
            method: 'GET'
        });
        if (response.ok) {
            const result = await response.json();
            const folderParentFolderId = result.folderParentFolderId;
            data = {folderParentFolderId: folderParentFolderId};
        } else {
            throw new Error(`Error: ${response.status}`);
        }
    } else {
        data = { folderParentFolderId: parentFolderID };
    }

    if (parentFolderID === folderID) {
        return;
    }

    const updateResponse = await fetch(`/api/folders/${folderID}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    if (!updateResponse.ok) {
        throw new Error("Something went wrong, please try again");
    }

    try {
        return await updateResponse.json();
    } catch (error) {
        throw new Error("Failed to parse JSON response");
    }
}