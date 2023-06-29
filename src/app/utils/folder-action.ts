export async function deleteFolder(folderID: string) {
    try {
        await fetch(`/api/folders/${folderID}`, {
            method: 'DELETE',
        });
    } catch (error) {
        console.log(error)
    }
}

export async function changeName(folderName: string, folderID: string) {
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