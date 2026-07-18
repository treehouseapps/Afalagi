"use client";

import { FormEvent, type ReactNode, useState } from "react";
import { Edit2, Mail, MapPin, Phone, Save, Store } from "lucide-react";
import styles from "../pharmacy.module.css";

type Profile = {
  name: string;
  license: string;
  description: string;
  phone: string;
  email: string;
  address: string;
};

export default function ProfilePage() {
  const original: Profile = {
    name: "Health Plus Pharmacy",
    license: "ETH-PH-2023-8921",
    description:
      "A premier community pharmacy dedicated to providing quality healthcare products.",
    phone: "+251 911 23 45 67",
    email: "contact@healthplus.com",
    address: "Bole Road, Near Edna Mall, Addis Ababa",
  };

  const [profile, setProfile] = useState(original);
  const [draft, setDraft] = useState(original);
  const [editing, setEditing] = useState(false);
  const update = (key: keyof Profile, value: string) =>
    setDraft({ ...draft, [key]: value });
  function submit(e: FormEvent) {
    e.preventDefault();
    setProfile(draft);
    setEditing(false);
  }
  const fields: [keyof Profile, string, ReactNode][] = [
    ["phone", "Phone", <Phone size={16} />],
    ["email", "Email", <Mail size={16} />],
    ["address", "Address", <MapPin size={16} />],
  ];
  return (
    <form className={styles.profilePage} onSubmit={submit}>
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
                  <Edit2 size={16} /> Edit profile
                </>
              )}
            </button>
          </div>
          <div className={styles.profileGrid}>
            <section>
              <Field
                editing={editing}
                label="Pharmacy name"
                value={editing ? draft.name : profile.name}
                onChange={(v) => update("name", v)}
              />
              <Field
                editing={editing}
                label="License number"
                value={editing ? draft.license : profile.license}
                onChange={(v) => update("license", v)}
              />
              <Field
                editing={editing}
                label="Description"
                value={editing ? draft.description : profile.description}
                onChange={(v) => update("description", v)}
                multiline
              />
            </section>
            <section>
              <h2>Contact Details</h2>
              {fields.map(([key, label, icon]) => (
                <div className={styles.contactField} key={key}>
                  {icon}
                  <Field
                    editing={editing}
                    label={label}
                    value={editing ? draft[key] : profile[key]}
                    onChange={(v) => update(key, v)}
                    multiline={key === "address"}
                  />
                </div>
              ))}
            </section>
          </div>
          {editing && (
            <div className={styles.saveBar}>
              <button className={styles.primaryButton}>
                <Save size={16} /> Save Profile Updates
              </button>
            </div>
          )}
        </div>
      </article>
    </form>
  );
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
            rows={label === "Description" ? 3 : 2}
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
