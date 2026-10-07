'use client';

import { Trash } from 'lucide-react';
import Image from 'next/image';
import { Button } from './ui/button';

export type LocalImageValue = {
  key: string;
  fileUrl: string;
};

interface ImageUploadProps {
  onChange?: (value: LocalImageValue[]) => void;
  onRemove: (value: LocalImageValue[]) => void;
  value: LocalImageValue[];
}

/**
 * Legacy starter upload field.
 *
 * The original component imported an UploadThing router that did not exist,
 * which made lint/build fail. Until a real storage flow is configured, this
 * component only displays/removes existing image URLs and does not pretend an
 * upload backend is available.
 */
export default function FileUpload({
  onChange: _onChange,
  onRemove,
  value
}: ImageUploadProps) {
  const onDeleteFile = (key: string) => {
    onRemove(value.filter((item) => item.key !== key));
  };

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-4">
        {value.map((item) => (
          <div
            key={item.key}
            className="relative h-[160px] w-[160px] overflow-hidden rounded-md border"
          >
            <div className="absolute right-2 top-2 z-10">
              <Button
                type="button"
                onClick={() => onDeleteFile(item.key)}
                variant="destructive"
                size="sm"
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
            <Image fill className="object-cover" alt="" src={item.fileUrl} />
          </div>
        ))}
      </div>
      <p className="text-sm text-muted-foreground">
        Upload de arquivos desativado até a configuração de um storage persistente.
      </p>
    </div>
  );
}
