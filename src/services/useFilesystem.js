import { Directory, Filesystem } from '@capacitor/filesystem';
import { ref } from 'vue';

export function useFilesystem() {
    const readFile = async (path) => {
        try {
            const result = await Filesystem.readFile({
                path,
                directory: Directory.Data,
            });
            return result.data;
        } catch (error) {
            console.error('Error reading file:', error);
            return null;
        }
    };

    const writeFile = async (path, data) => {
        try {
            await Filesystem.writeFile({
                path,
                data,
                directory: Directory.Data,
            });
            return true;
        } catch (error) {
            console.error('Error writing file:', error);
            return false;
        }
    };

    const deleteFile = async (path) => {
        try {
            await Filesystem.deleteFile({
                path,
                directory: Directory.Data,
            });
        } catch (error) {
            console.error('Error deleting file:', error);
        }
    };

    return {
        readFile,
        writeFile,
        deleteFile,
    };
}
