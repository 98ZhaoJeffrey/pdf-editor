import { changeFolderParent } from "./dashboard-action";

export const handleDragStart = (event: React.DragEvent<HTMLElement>, id: string) => {
    event.dataTransfer.setData('text/plain', id);
    event.currentTarget.classList.add('opacity-0');
    document.getElementById('text-title')?.classList.add('border')
};

export const handleDragEnd = (event: React.DragEvent<HTMLElement>) => {
    event.currentTarget.classList.remove('opacity-0')
    document.getElementById('text-title')?.classList.remove('border')
}

export const handleDragEnter = (event: React.DragEvent<HTMLElement>) => {
    event.preventDefault();

    // Get the target folder element
    const targetFolder = event.currentTarget;

    // Add CSS classes or styles to indicate the potential drop target
    targetFolder.firstElementChild?.firstElementChild?.classList.add('bg-blue-300');
};

export const handleDragOver = (event: React.DragEvent<HTMLElement>) => {
    event.preventDefault();

    // Prevent the default behavior of disallowing drops
    event.dataTransfer.dropEffect = 'move';
};

export const handleDragLeave = (event: React.DragEvent<HTMLElement>) => {
    event.preventDefault();

    // Get the target folder element
    const targetFolder = event.currentTarget;

    // Check if the mouse pointer is leaving the target folder
    const isLeavingTargetFolder = !targetFolder.contains(event.relatedTarget as Node);

    // Remove the CSS class only if the mouse pointer is leaving the target folder
    if (isLeavingTargetFolder) {
        targetFolder.firstElementChild?.firstElementChild?.classList.remove('bg-blue-300');
    }
};


export const handleDrop = async (event: React.DragEvent<HTMLElement>, id: string, extract: boolean) => {
    event.preventDefault();
    const draggedFolderID = event.dataTransfer.getData('text/plain');
    event.currentTarget.firstElementChild?.firstElementChild?.classList.remove('bg-blue-300');
    // Move the dragged folder into the target folder and update the folder structure accordingly
    await changeFolderParent(id, draggedFolderID, extract);
    console.log(`Moved ${draggedFolderID} into ${id}`)
};
