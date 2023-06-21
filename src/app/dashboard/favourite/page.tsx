import FolderDisplay from '@/app/components/FolderDisplay';
import React from 'react'

const Page: React.FC = () => {
    return (
        <FolderDisplay category='Favourites' folders={[]} />
    );
};

export default Page;
