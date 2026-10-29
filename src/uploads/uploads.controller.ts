import { Controller, UseInterceptors, Post, BadRequestException, UploadedFile, ParseFilePipe, MaxFileSizeValidator, UploadedFiles } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { randomUUID } from 'crypto';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('uploads')
export class UploadsController {

    @Post("multiple")
    @UseInterceptors(
        FilesInterceptor("files", 5, {
            storage: diskStorage({
                destination: "./uploads",
                filename: (req, file, callback) => {
                    const uniqueName = `${randomUUID()}${extname(file.originalname).toLowerCase()}`;
                    callback(null, uniqueName);
                }
            }),
            limits: {
                fileSize: 2 * 1024 * 1024,
                files: 5
            },
            fileFilter: (req, file, callback) => {
                const allowedtypes = ["image/jpeg", "image/png"]
                if (!allowedtypes.includes(file.mimetype)) {
                    return callback(
                        new BadRequestException("Only JPEG and PNG files are allowed"),
                        false
                    )
                }
                callback(null, true);
            }
        })
    )

    async uploadMultipleFiles(
        @UploadedFiles() files: Express.Multer.File[],
    ) {
        if (!files || files.length === 0) {
            throw new BadRequestException("Please upload at least one file")
        }

        return {
            message: "Files uploaded successfully",
            totalFiles: files.length,
            files: files.map((file) => ({
                filename: file.filename,
                originalName: file.originalname,
                size: file.size,
                mimetype: file.mimetype,
                path: file.path
            }))
        }
    }
}
