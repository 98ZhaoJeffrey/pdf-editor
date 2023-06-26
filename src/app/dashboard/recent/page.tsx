import FolderDisplay from '@/app/components/Folder/FolderDisplay';
import React from 'react'

const Page: React.FC = () => {
    return (
        <FolderDisplay category='Recent' folders={[]} />
    );
};

export default Page;