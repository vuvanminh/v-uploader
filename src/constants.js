/**
 * 文件容量转换具体的bytes数值
 * @param fileSize 参数类型（String），例：2MB，230KB，1TB等
 * @param thousand 参数类型（boolean），是否以1000为计算单位，否则以默认的1024为计算单位
 */
let fileSize2Bytes = (fileSize, thousand)=>{
    if(!fileSize) return null;
    let baseUnit = thousand ? 1000 : 1024;
    let kb = baseUnit, mb = kb * baseUnit, gb = mb * baseUnit;
    let tmpCode = fileSize.substring(fileSize.length - 2).toUpperCase();
    let sizeNumber = fileSize.substring(0, fileSize.length - 2);
    let num = Number.parseInt(sizeNumber);
    let result = 0;
    switch (tmpCode) {
        case 'KB':
            result = num * kb;
            break;
        case 'MB':
            result = num * mb;
            break;
        case 'GB':
            result = num * gb;
            break;
    }
    return result;
};

const i18n = {
    cn: {
        messages: {
            'typeError' : "{file} 文件格式不正确。有效格式： {extensions}",
            'sizeError' : "{file} 文件容量超过限制, 文件最大容量为： {sizeLimit}",
            'minSizeError' : "{file} 文件容量低于限制, 上传的文件最小容量为： {minSizeLimit}.",
            'emptyError' : "{file} 文件为空，请选择其他文件进行上传。",
            'noFilesError' : "未选择任何文件进行上传",
            'tooManyItemsError' : "太多文件 ({netItems}) 需要被上传，上传文件数量限制为： {itemLimit}个",
            'maxHeightImageError' : "图片高度超过限制",
            'maxWidthImageError' : "图片宽度超过限制",
            'minHeightImageError' : "图片高度不足",
            'minWidthImageError' : "图片宽度不足",
            'retryFailTooManyItems' : "重试失败 - 您已达到文件数量上限。",
            'onLeave' : "文件正在上传，若离开该页面，正在上传的文件将被取消"
        },
        text: {
            'failUpload' : '上传失败',
            'fileInputTitle' : '选择文件进行上传'
        },
        ui: {
            thumbnail: '图片预览',
            choseFileButton: '选择文件',
            dropHere: '将文件拖到这里进行上传……',
            done: '完成',
            fileTypes: '文件类型',
            fileSizeLimit: '文件容量限制'
        }

    },
    vi: {
        messages: {
            'typeError' : "{file} Định dạng tệp không chính xác. Định dạng hợp lệ: {extensions}",
            'sizeError' : "{file} Dung lượng tệp vượt quá giới hạn và kích thước tệp tối đa là: {sizeLimit}",
            'minSizeError' : "{file} Kích thước tệp dưới giới hạn và kích thước tệp tối thiểu để tải lên là: {minSizeLimit}.",
            'emptyError' : "{file} Tệp này trống. Vui lòng chọn một tệp khác để tải lên.",
            'noFilesError' : "Không có tệp nào được chọn để tải lên",
            'tooManyItemsError' : "Quá nhiều tệp ({netItems}) được tải lên, số lượng tệp tải lên được giới hạn trong: {itemLimit}个",
            'maxHeightImageError' : "Chiều cao hình ảnh vượt quá giới hạn",
            'maxWidthImageError' : "Chiều rộng hình ảnh vượt quá giới hạn",
            'minHeightImageError' : "Chiều cao hình ảnh quá nhỏ",
            'minWidthImageError' : "Chiều rộng hình ảnh quá nhỏ",
            'retryFailTooManyItems' : "Thử lại không thành công - Bạn đã đạt đến số lượng tệp tối đa.",
            'onLeave' : "Tệp đang được tải lên. Nếu bạn rời khỏi trang, tệp đang được tải lên sẽ bị hủy."
        },
        text: {
            'failUpload' : 'Tải lên không thành công',
            'fileInputTitle' : 'Chọn tệp để tải lên'
        },
        ui: {
            thumbnail: 'Xem trước hình ảnh',
            choseFileButton: 'Chọn tệp',
            dropHere: 'Kéo tệp vào đây để tải lên...',
            done: 'Hoàn thành',
            fileTypes: 'Loại tệp',
            fileSizeLimit: 'Giới hạn kích thước tệp'
        }

    },
    en: {
        ui: {
            thumbnail: 'thumbnail',
            choseFileButton: 'select file',
            dropHere: 'drop files here',
            done: 'done',
            fileTypes: 'file extensions',
            fileSizeLimit: 'file size limit'
        }
    }
};

const buildOptions = function(){
    let p = {
        multiple: this.multiple,
        request: {
            endpoint: this.uploadFileUrl,
            inputName: this.uploadFileObjName,
            //server side validate file info
            params: {
                'fileSizeLimit': this.fileSizeLimit,
                'fileTypeExts': this.fileTypeExts
            }
        },
        deleteFile: {
            enabled: true,
            method: "POST"//,
            //'endpoint' : $webroot + 'upload/deleteUploadFile'
        },
        debug: true,
        validation: {
            allowedExtensions: this.fileTypeExts.split(','),
            sizeLimit: fileSize2Bytes(this.fileSizeLimit, true),
            sizeLimitStr: this.fileSizeLimit,
            image: {
                maxHeight: this.imageMaxHeight,
                maxWidth: this.imageMaxWidth,
                minHeight: this.imageMinHeight,
                minWidth: this.imageMinWidth
            }
        },
        callbacks: {
            //the callback when file upload finish
            onComplete: function(id,name,json,xhr){},
            //the callback before delete file, return false can stop it.
            onSubmitDelete: function(id){}
        }
    };
    if(this.language && this.language === 'vi'){
        p.messages = i18n.vi.messages;
        p.text = i18n.vi.text;
    }
    if(this.callback && typeof this.callback === 'function'){
        p.callbacks.onComplete = (id,name,json,xhr) => {
            if(json) this.callback(json);
        };
    }
    return p;
}

const getI18n = language => (!language || language !== 'en') ? i18n.vi.ui : i18n.en.ui ;

export {buildOptions};
export {getI18n};