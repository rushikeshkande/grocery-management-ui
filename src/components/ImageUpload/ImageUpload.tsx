import React from "react";
import "./styles/ImageUpload.style.scss";
import ReactCrop from "react-image-crop";
import "react-image-crop/lib/ReactCrop.scss";
import { Modal, notification } from "antd";

export interface ImageUploadState {
  src: any;
  crop: Object;
  croppedImageUrl: any;
  visible: boolean;
}
export interface ImageUploadProps {
    handleSaveCropper: (file:any) => void
}

export class ImageUpload extends React.PureComponent<
  ImageUploadProps,
  ImageUploadState
> {
  private imageRef: React.RefObject<HTMLImageElement>;
  state = {
    src: null,
    croppedImageUrl: null,
    crop: {
      aspect: 1,
      width: 100,
      x: 0,
      y: 0,
    },
    visible: false,
  };
  fileUrl = null;

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = (e) => {
    this.setState({
      visible: false,
    });
    this.props.handleSaveCropper(this.state.croppedImageUrl);
  };

  handleCancel = (e) => {
    this.setState({ src: null, visible: false });
  };

  onSelectFile = (e: any) => {
    if (e.target.files && e.target.files.length > 0) {
      if (e.target.files[0].size > 3145728) {
          notification.error({
              message: "Image Size",
              description: "Selected image size cannot be greater than 3 MB"
          });
      } else {
        const reader = new FileReader();
        reader.addEventListener("load", () =>
          this.setState({ src: reader.result })
        );
        reader.readAsDataURL(e.target.files[0]);
        this.showModal();
      }
    }
  };

  onImageLoaded = (image: any) => {
    this.imageRef = image;
  };

  onCropComplete = (crop) => {
    this.makeClientCrop(crop);
  };

  onCropChange = (crop: any) => {
    this.setState({ crop });
  };

  async makeClientCrop(crop: any) {
    if (this.imageRef && crop.width && crop.height) {
      const croppedImageUrl = await this.getCroppedImg(
        this.imageRef,
        crop,
        "newFile.jpeg"
      );
      this.setState({ croppedImageUrl });
    }
  }

  getCroppedImg(
    image: any,
    crop: { width: number; height: number; x: number; y: number },
    fileName: string
  ) {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob((blob: any) => {
        if (!blob) {
          console.error("Canvas is empty");
          return;
        }
        blob.name = fileName;
        console.log(">> blob.size", blob.size);
        if (blob.size > 3145728) {
            notification.error({
                message: "Image Size",
                description: "Selected image size cannot be greater than 3 MB"
            });
        } else {
          window.URL.revokeObjectURL(this.fileUrl);
          this.fileUrl = window.URL.createObjectURL(blob);
          resolve(this.fileUrl);
        }
      }, "image/jpeg");
    });
  }

  render() {
    const { crop, src, croppedImageUrl } = this.state;
    return (
      <form>
        <label htmlFor="profile_pic"></label>
        <input
          type="file"
          id="profile_pic"
          onChange={this.onSelectFile}
        />
        <img alt="profile" src={croppedImageUrl} style={{width:"50px",height:"50px"}} />
        {src && (
          <Modal
            title="Crop Profile Image"
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
          >
            <ReactCrop
              src={src}
              crop={crop}
              onImageLoaded={this.onImageLoaded}
              onComplete={this.onCropComplete}
              onChange={this.onCropChange}
            />
          </Modal>
        )}
      </form>
    );
  }
}
