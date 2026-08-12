"use client";

import { useEffect, useState, type ReactNode } from "react";
import {
  Edit2,
  FileText,
  Mail,
  MapPin,
  Save,
  Store,
  Upload,
} from "lucide-react";
import styles from "../pharmacy.module.css";
import { Profile as ProfileType } from "../../../types/pharmacy";
import { getMyPharmacyProfile, updateMyProfile } from "@/actions/pharmacy";

type Profile = ProfileType;

export const dynamic = "force-dynamic";

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [draft, setDraft] = useState<Profile | null>(null);
  const [editing, setEditing] = useState(false);

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

  const fields: [keyof Profile, string, ReactNode][] = [
    ["phone", "Phone", <PhoneIcon key="phone" />],
    ["email", "Email", <Mail size={16} key="email" />],
  ];

  const isVerified = profile.approved;

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
                value={isVerified ? "Verified" : "Pending Approval"}
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
            {isVerified ? (
              <>
                <div className={styles.documentStatus}>
                  <FileText size={20} />

                  <div>
                    <strong>Document approved</strong>

                    <p>Your pharmacy has been verified successfully.</p>
                  </div>
                </div>

                <button type="button" className={styles.secondaryButton}>
                  View Document
                </button>
              </>
            ) : (
              <>
                <div className={styles.documentStatus}>
                  <FileText size={20} />

                  <div>
                    <strong>Document required</strong>

                    <p>
                      Upload a clear photo or scan of your pharmacy license or
                      registration document.
                    </p>
                  </div>
                </div>

                <label className={styles.uploadButton}>
                  <Upload size={16} />
                  Upload Document
                  <input
                    type="file"
                    accept="image/jpeg,image/png,application/pdf"
                    hidden
                  />
                </label>
              </>
            )}
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
