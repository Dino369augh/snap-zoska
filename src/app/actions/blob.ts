'use server';

import { put } from "@vercel/blob";

export async function uploadFile(file: File) {
  try {
    const { url } = await put(file.name, file, {
      access: 'public',
    });
    return { url };
  } catch (error) {
    console.error('Error uploading file:', error);
    throw new Error('Failed to upload file');
  }
}

export async function uploadText(filename: string, content: string) {
  try {
    const { url } = await put(filename, content, {
      access: 'public',
    });
    return { url };
  } catch (error) {
    console.error('Error uploading text:', error);
    throw new Error('Failed to upload text');
  }
} 