'use client';

import { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, X, AlertCircle, CheckCircle } from 'lucide-react';

interface Step3Props {
  onBack: () => void;
  onContinue: () => void;
}

export function Step3Verification({ onBack, onContinue }: Step3Props) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File): string | null => {
    // Check file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (!validTypes.includes(file.type)) {
      return 'Invalid file format. Please upload JPG, JPEG, or PNG only.';
    }

    // Check file size (max 2MB)
    const maxSize = 2 * 1024 * 1024; // 2MB in bytes
    if (file.size > maxSize) {
      return 'File size exceeds 2MB. Please upload a smaller file.';
    }

    return null;
  };

  const handleFileSelect = (file: File) => {
    const validationError = validateFile(file);
    if (validationError) {
      setError(validationError);
      return;
    }

    setError(null);
    setSelectedFile(file);

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Document Verification</CardTitle>
        <CardDescription>
          Upload your government-issued ID for verification
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Upload Area */}
        <div className="space-y-4">
          {!selectedFile ? (
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onClick={() => fileInputRef.current?.click()}
              className="rounded-lg border-2 border-dashed border-muted-foreground/30 p-12 text-center cursor-pointer hover:border-[#006FD6] transition-colors"
            >
              <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-sm font-medium mb-1">Click to upload or drag and drop</p>
              <p className="text-xs text-muted-foreground">JPG, JPEG or PNG (max. 2MB)</p>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/jpg,image/png"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
          ) : (
            <div className="rounded-lg border-2 border-[#00A864]/20 p-4">
              <div className="flex items-start gap-4">
                {previewUrl && (
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="w-32 h-32 object-cover rounded-lg border"
                  />
                )}
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium text-sm">{selectedFile.name}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {(selectedFile.size / 1024).toFixed(2)} KB
                      </p>
                      <div className="flex items-center gap-1 mt-2 text-[#00A864]">
                        <CheckCircle className="h-4 w-4" />
                        <span className="text-xs font-medium">File uploaded successfully</span>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleRemoveFile}
                      className="h-8 w-8 p-0"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {error && (
            <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 dark:bg-red-950/20 p-3 rounded-lg">
              <AlertCircle className="h-4 w-4" />
              <p>{error}</p>
            </div>
          )}
        </div>

        {/* Upload Requirements */}
        <div className="rounded-lg bg-[#006FD6]/5 dark:bg-[#006FD6]/10 border border-[#006FD6]/30 p-4">
          <div className="flex items-start gap-2 mb-3">
            <AlertCircle className="h-5 w-5 text-[#006FD6] mt-0.5 flex-shrink-0" />
            <h4 className="font-semibold text-sm text-foreground">Please Note</h4>
          </div>
          <ul className="space-y-2 text-sm text-foreground/90">
            <li className="flex items-start gap-2">
              <span className="text-[#006FD6] mt-0.5">•</span>
              <span><strong>File Size:</strong> Maximum 2MB</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#006FD6] mt-0.5">•</span>
              <span><strong>Dimensions:</strong> Must be between 256x256px and 4096x4096px</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#006FD6] mt-0.5">•</span>
              <span><strong>File Format:</strong> Acceptable formats are JPG, JPEG, or PNG</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#006FD6] mt-0.5">•</span>
              <span><strong>Color Document:</strong> Only upload a colored image of your ID Card/KTP</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#006FD6] mt-0.5">•</span>
              <span><strong>Clarity:</strong> Ensure the document is clearly visible and easy to read</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#006FD6] mt-0.5">•</span>
              <span><strong>Proper Alignment:</strong> The ID Card/KTP photo should not be tilted or skewed</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#006FD6] mt-0.5">•</span>
              <span><strong>No Blemishes:</strong> Avoid images with light reflections, glare, or blemishes</span>
            </li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button
            onClick={onBack}
            variant="outline"
            className="flex-1"
          >
            Back
          </Button>
          <Button
            onClick={onContinue}
            disabled={!selectedFile}
            className="flex-1 bg-[#225B3A] text-white hover:bg-[#1C4A30] transition-all hover:scale-[1.02]"
          >
            Continue
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
