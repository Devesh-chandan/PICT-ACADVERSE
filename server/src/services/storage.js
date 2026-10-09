import cloudinary from "../config/cloudinary.js";

/**
 * Thin wrapper around Cloudinary so route code never talks to the SDK directly
 * (and tests can swap `storage.upload` / `storage.destroy` for fakes).
 */

// https://res.cloudinary.com/<cloud>/<image|raw|video>/upload/[transformations/]v123/<public id>[.ext]
const CLOUDINARY_URL_RE = /res\.cloudinary\.com\/[^/]+\/(image|raw|video)\/upload\/(?:[^/]+\/)*?v\d+\/(.+?)(?:\?.*)?$/;

/**
 * Recover { publicId, resourceType } from a stored Cloudinary URL. Needed for
 * documents uploaded before we started saving `publicId`.
 */
export const parseCloudinaryUrl = (url) => {
  if (typeof url !== "string") return null;
  const match = CLOUDINARY_URL_RE.exec(url);
  if (!match) return null;

  const [, resourceType, path] = match;
  // Images/PDFs are addressed without their extension; raw files keep it.
  const publicId = resourceType === "raw" ? path : path.replace(/\.[^/.]+$/, "");
  return { publicId: decodeURIComponent(publicId), resourceType };
};

/** The asset reference for a document, preferring what we stored at upload time. */
export const assetRef = (doc) => {
  if (doc?.publicId) {
    return { publicId: doc.publicId, resourceType: doc.resourceType || "image" };
  }
  return parseCloudinaryUrl(doc?.fileUrl ?? doc?.attachmentUrl);
};

const upload = (buffer, { folder, filename }) =>
  new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        resource_type: "auto",
        folder,
        use_filename: Boolean(filename),
        filename_override: filename,
        unique_filename: true,
      },
      (error, result) => {
        if (error) return reject(error);
        resolve({
          url: result.secure_url,
          publicId: result.public_id,
          resourceType: result.resource_type,
        });
      }
    );
    stream.end(buffer);
  });

/** Best-effort removal; a missing asset must never block deleting the record. */
const destroy = async (ref) => {
  if (!ref?.publicId) return false;
  try {
    const result = await cloudinary.uploader.destroy(ref.publicId, {
      resource_type: ref.resourceType || "image",
      invalidate: true,
    });
    return result?.result === "ok";
  } catch (error) {
    console.error("Storage cleanup failed:", error.message);
    return false;
  }
};

export const storage = { upload, destroy };
export default storage;
