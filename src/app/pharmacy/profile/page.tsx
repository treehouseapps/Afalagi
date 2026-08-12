"use client";

import { useEffect, useState, type ReactNode } from "react";
import {
  Edit2,
  ExternalLink,
  FileText,
  Mail,
  MapPin,
  Save,
  Store,
  Upload,
} from "lucide-react";

import styles from "../pharmacy.module.css";

import { Profile as ProfileType } from "../../../types/pharmacy";

import {
  getMyPharmacyProfile,
  updateMyProfile,
  uploadPharmacyDocument,
} from "@/actions/pharmacy";

type Profile = ProfileType;

export const dynamic = "force-dynamic";

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [draft, setDraft] = useState<Profile | null>(null);
  const [editing, setEditing] = useState(false);

  const [uploading, setUploading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState("");

  useEffect(() => {
    async function loadProfile() {
      const data = await getMyPharmacyProfile();

      setProfile(data);
      setDraft(data);
    }

    loadProfile();
  }, []);

  if (!profile || !draft) {
    return <p>Loading profile...</p>;
  }

  const update = (key: keyof Profile, value: string) => {
    setDraft({
      ...draft,
      [key]: value,
    });
  };

  async function submit(e: React.FormEvent) {
    e.preventDefault();

    if (!draft) return;

    const result = await updateMyProfile({
      name: draft.name,
      phone: draft.phone,
      address: draft.address,
      city: draft.city,
    });

    if (!result.ok) return;

    setProfile(draft);
    setEditing(false);
  }

  async function handleDocumentUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!profile) {
      setUploadMessage("Profile not loaded.");
      return;
    }

    setUploading(true);
    setUploadMessage("");

    const formData = new FormData();
    formData.append("document", file);

    const result = await uploadPharmacyDocument(formData);

    if (!result.ok) {
      setUploadMessage(result.error);
      setUploading(false);
      return;
    }

    const updatedProfile: Profile = {
      name: profile.name,
      ownerName: profile.ownerName,
      phone: profile.phone,
      email: profile.email,
      city: profile.city,
      address: profile.address,
      documentUrl: result.url,
      documentStatus: "PENDING",
      rejectionReason: null,
      approved: false,
    };

    setProfile(updatedProfile);
    setDraft(updatedProfile);

    setUploadMessage("Document uploaded successfully.");
    setUploading(false);

    e.target.value = "";
  }
  const fields: [keyof Profile, string, ReactNode][] = [
    ["phone", "Phone", <PhoneIcon key="phone" />],
    ["email", "Email", <Mail size={16} key="email" />],
  ];

  const isVerified = profile.approved && profile.documentStatus === "APPROVED";

  return (
    <form className={styles.profilePage} onSubmit={submit}>
      {/* Profile Information */}
      <article className={styles.profileCard}>
        <div className={styles.profileCover} />

        <div className={styles.profileBody}>
          <div className={styles.profileTop}>
            <span className={styles.storeIcon}>
              <Store size={38} />
            </span>

            <button
              type="button"
              className={
                editing ? styles.secondaryButton : styles.primaryButton
              }
              onClick={() => {
                setDraft(profile);
                setEditing(!editing);
              }}
            >
              {editing ? (
                "Cancel edit"
              ) : (
                <>
                  <Edit2 size={16} />
                  Edit profile
                </>
              )}
            </button>
          </div>

          <div className={styles.profileGrid}>
            {/* Basic Information */}
            <section>
              <Field
                editing={editing}
                label="Pharmacy name"
                value={draft.name}
                onChange={(v) => update("name", v)}
              />

              <Field
                editing={false}
                label="Owner name"
                value={profile.ownerName}
                onChange={() => {}}
              />

              <Field
                editing={false}
                label="Status"
                value={
                  isVerified
                    ? "Verified"
                    : profile.documentStatus === "REJECTED"
                      ? "Verification Rejected"
                      : profile.documentStatus === "PENDING"
                        ? "Under Review"
                        : "Pending Approval"
                }
                onChange={() => {}}
              />
            </section>

            {/* Contact Details */}
            <section>
              <h2>Contact Details</h2>

              {fields.map(([key, label, icon]) => (
                <div className={styles.contactField} key={key}>
                  {icon}

                  <Field
                    editing={editing}
                    label={label}
                    value={draft[key] as string}
                    onChange={(v) => update(key, v)}
                  />
                </div>
              ))}

              <div className={styles.contactField}>
                <MapPin size={16} />

                <div style={{ width: "100%" }}>
                  {editing ? (
                    <>
                      <Field
                        editing
                        label="Address"
                        value={draft.address}
                        onChange={(v) => update("address", v)}
                        multiline
                      />

                      <Field
                        editing
                        label="City"
                        value={draft.city}
                        onChange={(v) => update("city", v)}
                      />
                    </>
                  ) : (
                    <Field
                      editing={false}
                      label="Address"
                      value={`${profile.address}, ${profile.city}`}
                      onChange={() => {}}
                    />
                  )}
                </div>
              </div>
            </section>
          </div>

          {editing && (
            <div className={styles.saveBar}>
              <button type="submit" className={styles.primaryButton}>
                <Save size={16} />
                Save Profile Updates
              </button>
            </div>
          )}
        </div>
      </article>

      <article className={styles.profileCard}>
        <div className={styles.profileBody}>
          <div className={styles.profileTop}>
            <div>
              <br />
              <h2>Verification Documents</h2>

              <p>
                Upload your pharmacy license or registration document for
                verification.
              </p>
            </div>

            <FileText size={28} />
          </div>

          <div className={styles.documentSection}>
            {isVerified && (
              <>
                <div className={styles.documentStatus}>
                  <FileText size={20} />

                  <div>
                    <strong>Document Approved</strong>

                    <p>Your pharmacy has been successfully verified.</p>
                  </div>
                </div>

                {profile.documentUrl && (
                  <a
                    href={profile.documentUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.secondaryButton}
                  >
                    <ExternalLink size={16} />
                    View Document
                  </a>
                )}
              </>
            )}

            {!isVerified &&
              profile.documentStatus === "PENDING" &&
              profile.documentUrl && (
                <>
                  <div className={styles.documentStatus}>
                    <FileText size={20} />

                    <div>
                      <strong>Document Under Review</strong>

                      <p>
                        Your document has been uploaded and is waiting for admin
                        verification.
                      </p>
                    </div>
                  </div>

                  <a
                    href={profile.documentUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.secondaryButton}
                  >
                    <ExternalLink size={16} />
                    View Document
                  </a>
                </>
              )}

            {profile.documentStatus === "REJECTED" && (
              <>
                <div className={styles.documentStatus}>
                  <FileText size={20} />

                  <div>
                    <strong>Document Rejected</strong>

                    <p>
                      {profile.rejectionReason ||
                        "Your document was rejected. Please upload a new document."}
                    </p>
                  </div>
                </div>

                {profile.documentUrl && (
                  <a
                    href={profile.documentUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.secondaryButton}
                  >
                    <ExternalLink size={16} />
                    View Previous Document
                  </a>
                )}

                <label className={styles.uploadButton}>
                  <Upload size={16} />

                  {uploading ? "Uploading..." : "Upload New Document"}

                  <input
                    type="file"
                    accept="image/jpeg,image/png"
                    hidden
                    disabled={uploading}
                    onChange={handleDocumentUpload}
                  />
                </label>
              </>
            )}

            {!profile.documentUrl &&
              profile.documentStatus !== "REJECTED" &&
              !isVerified && (
                <>
                  <div className={styles.documentStatus}>
                    <FileText size={20} />

                    <div>
                      <strong>Document Required</strong>

                      <p>
                        Upload a clear JPG or PNG photo of your pharmacy license
                        or registration document.
                      </p>
                    </div>
                  </div>

                  <label className={styles.uploadButton}>
                    <Upload size={16} />

                    {uploading ? "Uploading..." : "Upload Document"}

                    <input
                      type="file"
                      accept="image/jpeg,image/png"
                      hidden
                      disabled={uploading}
                      onChange={handleDocumentUpload}
                    />
                  </label>
                </>
              )}

            {uploadMessage && <p>{uploadMessage}</p>}
          </div>
        </div>
      </article>
    </form>
  );
}

function PhoneIcon() {
  return <span>☎</span>;
}

function Field({
  label,
  value,
  editing,
  onChange,
  multiline,
}: {
  label: string;
  value: string;
  editing: boolean;
  onChange: (value: string) => void;
  multiline?: boolean;
}) {
  return (
    <label className={styles.field}>
      <span>{label}</span>

      {editing ? (
        multiline ? (
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            rows={2}
          />
        ) : (
          <input value={value} onChange={(e) => onChange(e.target.value)} />
        )
      ) : (
        <p>{value}</p>
      )}
    </label>
  );
}
