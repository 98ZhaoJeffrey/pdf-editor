import FolderDisplay from '@/app/components/FolderDisplay';
import React from 'react'

const Page: React.FC = () => {
    return (
        <FolderDisplay category='Recent' folders={[]} />
    );
};

export default Page;