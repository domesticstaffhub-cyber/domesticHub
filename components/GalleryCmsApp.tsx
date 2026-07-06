"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useEffect, useRef, useState } from "react";
import {
  Camera,
  Edit3,
  Eye,
  EyeOff,
  ImagePlus,
  KeyRound,
  ListChecks,
  Loader2,
  LockKeyhole,
  LogOut,
  Plus,
  RefreshCw,
  Save,
  ShieldCheck,
  Trash2,
  Upload,
  X
} from "lucide-react";

type GalleryItem = {
  id: string;
  title: string;
  category: string;
  imageData: string;
  createdAt?: number;
};

type Notice = {
  tone: "success" | "error" | "info";
  text: string;
};

type ActiveTab = "library" | "add";
type ItemModalMode = "view" | "edit";

const categories = ["Chef", "Driver", "Home Tutor", "Caregiver", "Hospitality", "General Service"];
const maxOriginalFileSize = 14 * 1024 * 1024;
const targetImageDataLength = 520_000;

function noticeClass(tone: Notice["tone"]) {
  if (tone === "success") return "border-emerald-200 bg-emerald-50 text-emerald-700";
  if (tone === "error") return "border-amber-200 bg-amber-50 text-amber-800";
  return "border-brand-sky/30 bg-brand-blue/10 text-brand-navy";
}

function formatDate(value?: number) {
  if (!value) return "Recently added";

  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric"
  }).format(value);
}

function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new window.Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("Unable to load image."));
    image.src = src;
  });
}

async function compressImage(file: File) {
  if (!file.type.startsWith("image/")) {
    throw new Error("Choose an image file.");
  }

  if (file.size > maxOriginalFileSize) {
    throw new Error("This photo is too large. Choose a photo below 14MB.");
  }

  const source = URL.createObjectURL(file);

  try {
    const image = await loadImage(source);
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    if (!context) {
      throw new Error("Unable to prepare image.");
    }

    for (const maxSide of [1100, 900, 720]) {
      const ratio = Math.min(1, maxSide / Math.max(image.width, image.height));
      canvas.width = Math.max(1, Math.round(image.width * ratio));
      canvas.height = Math.max(1, Math.round(image.height * ratio));
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(image, 0, 0, canvas.width, canvas.height);

      for (const quality of [0.82, 0.74, 0.66, 0.58, 0.5, 0.42]) {
        const output = canvas.toDataURL("image/jpeg", quality);

        if (output.length <= targetImageDataLength) {
          return output;
        }
      }
    }

    throw new Error("Image is still too large. Try a smaller photo.");
  } catch (error) {
    if (error instanceof Error && error.message !== "Unable to load image.") {
      throw error;
    }

    throw new Error("Choose a JPG, PNG, or WebP image.");
  } finally {
    URL.revokeObjectURL(source);
  }
}

function PasswordInput({
  name,
  label,
  autoComplete
}: {
  name: string;
  label: string;
  autoComplete: string;
}) {
  const [visible, setVisible] = useState(false);

  return (
    <label className="grid gap-2 text-sm font-semibold text-brand-ink">
      {label}
      <span className="relative">
        <input
          name={name}
          type={visible ? "text" : "password"}
          autoComplete={autoComplete}
          className="field-input pr-12"
        />
        <button
          type="button"
          onClick={() => setVisible((value) => !value)}
          className="absolute right-2 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full text-slate-500 transition hover:bg-brand-blue/10 hover:text-brand-navy"
          aria-label={visible ? "Hide password" : "Show password"}
        >
          {visible ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </span>
    </label>
  );
}

export function GalleryCmsApp() {
  const [authState, setAuthState] = useState<"checking" | "locked" | "open">("checking");
  const [activeTab, setActiveTab] = useState<ActiveTab>("library");
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [notice, setNotice] = useState<Notice | null>(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [savingItem, setSavingItem] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const [preview, setPreview] = useState("");
  const [preparedImage, setPreparedImage] = useState("");
  const [preparingImage, setPreparingImage] = useState(false);
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [itemModalMode, setItemModalMode] = useState<ItemModalMode>("view");
  const fileRef = useRef<HTMLInputElement>(null);

  async function loadGallery() {
    setLoading(true);
    try {
      const response = await fetch("/api/cms/gallery", { cache: "no-store" });

      if (response.status === 401) {
        setAuthState("locked");
        return;
      }

      const result = await response.json();
      setAuthState("open");
      setItems(Array.isArray(result.items) ? result.items : []);

      if (!result.ok && result.message) {
        setNotice({ tone: "error", text: result.message });
      }
    } catch {
      setNotice({ tone: "error", text: "Unable to load gallery." });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadGallery();
  }, []);

  useEffect(() => {
    if (!notice) return;

    const timer = window.setTimeout(() => {
      setNotice(null);
    }, 3000);

    return () => window.clearTimeout(timer);
  }, [notice]);

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    setLoading(true);
    setNotice(null);

    try {
      const response = await fetch("/api/cms/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: String(formData.get("username") || ""),
          password: String(formData.get("password") || "")
        })
      });
      const result = await response.json();

      if (!response.ok || !result.ok) {
        setNotice({ tone: "error", text: result.message || "Incorrect username or password." });
        return;
      }

      form.reset();
      setAuthState("open");
      setNotice({ tone: "success", text: "Logged in successfully." });
      await loadGallery();
    } catch {
      setNotice({ tone: "error", text: "Unable to login." });
    } finally {
      setLoading(false);
    }
  }

  async function handleUpload(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const file = fileRef.current?.files?.[0];

    if (!file) {
      setNotice({ tone: "error", text: "Choose a gallery image." });
      return;
    }

    setUploading(true);
    setNotice(null);

    try {
      const imageData = preparedImage || (await compressImage(file));
      const response = await fetch("/api/cms/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: String(formData.get("title") || ""),
          category: String(formData.get("category") || ""),
          imageData
        })
      });
      const result = await response
        .json()
        .catch(() => ({ ok: false, message: "Upload failed. Please try a smaller image." }));

      if (!response.ok || !result.ok) {
        setNotice({ tone: "error", text: result.message || "Unable to add image." });
        return;
      }

      setItems((current) => [result.item, ...current]);
      setPreview("");
      setPreparedImage("");
      if (fileRef.current) fileRef.current.value = "";
      form.reset();
      setActiveTab("library");
      setNotice({ tone: "success", text: "Gallery image added." });
    } catch (error) {
      setNotice({ tone: "error", text: error instanceof Error ? error.message : "Unable to add image." });
    } finally {
      setUploading(false);
    }
  }

  async function handleDelete(item: GalleryItem) {
    if (!window.confirm(`Delete "${item.title}" from the gallery?`)) {
      return;
    }

    try {
      const response = await fetch("/api/cms/gallery/item", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: item.id })
      });
      const result = await response.json();

      if (!response.ok || !result.ok) {
        setNotice({ tone: "error", text: result.message || "Unable to delete image." });
        return;
      }

      setItems((current) => current.filter((entry) => entry.id !== item.id));
      setSelectedItem(null);
      setNotice({ tone: "success", text: "Gallery image deleted." });
    } catch {
      setNotice({ tone: "error", text: "Unable to delete image." });
    }
  }

  async function handleEdit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!selectedItem) return;

    const formData = new FormData(event.currentTarget);
    setSavingItem(true);
    setNotice(null);

    try {
      const response = await fetch("/api/cms/gallery/item", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: selectedItem.id,
          title: String(formData.get("title") || ""),
          category: String(formData.get("category") || "")
        })
      });
      const result = await response.json();

      if (!response.ok || !result.ok) {
        setNotice({ tone: "error", text: result.message || "Unable to update image." });
        return;
      }

      setItems((current) => current.map((item) => (item.id === result.item.id ? result.item : item)));
      setSelectedItem(result.item);
      setItemModalMode("view");
      setNotice({ tone: "success", text: "Gallery image updated." });
    } catch {
      setNotice({ tone: "error", text: "Unable to update image." });
    } finally {
      setSavingItem(false);
    }
  }

  async function handlePasswordChange(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const nextPassword = String(formData.get("nextPassword") || "");
    const confirmPassword = String(formData.get("confirmPassword") || "");

    if (nextPassword !== confirmPassword) {
      setNotice({ tone: "error", text: "New passwords do not match." });
      return;
    }

    setChangingPassword(true);
    setNotice(null);

    try {
      const response = await fetch("/api/cms/password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword: String(formData.get("currentPassword") || ""),
          nextPassword
        })
      });
      const result = await response.json();

      if (!response.ok || !result.ok) {
        setNotice({ tone: "error", text: result.message || "Unable to change password." });
        return;
      }

      form.reset();
      setPasswordModalOpen(false);
      setNotice({ tone: "success", text: result.message || "Password changed." });
    } catch {
      setNotice({ tone: "error", text: "Unable to change password." });
    } finally {
      setChangingPassword(false);
    }
  }

  async function handleLogout() {
    await fetch("/api/cms/logout", { method: "POST" }).catch(() => undefined);
    setAuthState("locked");
    setItems([]);
    setNotice(null);
  }

  function openItem(item: GalleryItem, mode: ItemModalMode) {
    setSelectedItem(item);
    setItemModalMode(mode);
  }

  if (authState === "checking") {
    return (
      <main className="grid min-h-dvh place-items-center bg-[#f7fbff] bg-mesh-light px-4 text-brand-ink">
        <div className="flex items-center gap-3 rounded-full bg-white/85 px-5 py-3 text-sm font-bold uppercase tracking-[0.18em] shadow-soft backdrop-blur">
          <Loader2 size={18} className="animate-spin text-brand-blue" />
          Loading Admin Center
        </div>
      </main>
    );
  }

  if (authState === "locked") {
    return (
      <main className="grid min-h-dvh place-items-center overflow-x-hidden bg-[#f7fbff] bg-mesh-light px-4 py-4 text-brand-ink sm:px-6 sm:py-6 lg:px-8">
        <section className="mx-auto grid w-full max-w-7xl gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div className="relative mx-auto flex min-h-[22rem] w-full max-w-xl items-center overflow-hidden rounded-[2rem] bg-brand-ink p-6 text-white shadow-glow lg:mx-0 lg:min-h-[30rem] lg:p-8">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-ink via-brand-ink/90 to-brand-navy/70" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_18%,rgba(244,182,63,.22),transparent_28%),radial-gradient(circle_at_18%_82%,rgba(43,191,138,.2),transparent_30%)]" />
            <div className="relative">
              <Image
                src="/images/services/full_logo.jpeg"
                width={96}
                height={120}
                alt="Domestic Staffing Hub logo"
                className="h-24 w-20 rounded-2xl border border-white/15 object-cover object-top shadow-soft"
                priority
              />
              <p className="mt-8 text-xs font-bold uppercase tracking-[0.28em] text-brand-gold">Domestic Staffing Hub</p>
              <h1 className="mt-3 text-4xl font-black leading-tight sm:text-5xl">Admin Center</h1>
              <p className="mt-5 max-w-xl text-sm leading-7 text-white/75">
                Manage gallery photos, organize approved service pictures, and keep the public gallery fresh.
              </p>
            </div>
          </div>

          <form
            onSubmit={handleLogin}
            className="mx-auto w-full max-w-lg rounded-[2rem] border border-white bg-white/90 p-5 text-brand-ink shadow-soft backdrop-blur sm:p-7"
          >
            <div className="mb-6 flex items-center gap-4 border-b border-slate-100 pb-5">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-brand-blue/10 text-brand-blue">
                <LockKeyhole size={23} />
              </span>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-brand-blue">Secure Login</p>
                <h2 className="mt-1 text-2xl font-black leading-tight text-brand-ink">Welcome back</h2>
              </div>
            </div>
            <div className="grid gap-4">
              <label className="grid gap-2 text-sm font-semibold text-brand-ink">
                Username
                <input name="username" autoComplete="username" defaultValue="Admin" className="field-input" />
              </label>
              <PasswordInput name="password" label="Password" autoComplete="current-password" />
            </div>
            {notice ? <p className={`mt-4 rounded-2xl border px-4 py-3 text-sm font-semibold ${noticeClass(notice.tone)}`}>{notice.text}</p> : null}
            <button
              type="submit"
              disabled={loading}
              className="mt-5 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-brand-ink px-5 text-sm font-bold text-white transition hover:bg-brand-navy disabled:opacity-70"
            >
              {loading ? <Loader2 size={18} className="animate-spin" /> : <ShieldCheck size={18} />}
              Login
            </button>
          </form>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f7fbff] bg-mesh-light text-brand-ink">
      <section className="px-4 py-5 text-white sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative flex flex-1 flex-col gap-5 overflow-hidden rounded-[2rem] bg-brand-ink p-5 shadow-glow sm:flex-row sm:items-center sm:justify-between">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-ink via-brand-ink/92 to-brand-navy/70" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_18%,rgba(244,182,63,.2),transparent_28%),radial-gradient(circle_at_12%_100%,rgba(73,183,245,.22),transparent_30%)]" />
            <div className="relative flex items-center gap-4">
              <Image
                src="/images/services/full_logo.jpeg"
                width={64}
                height={80}
                alt="Domestic Staffing Hub logo"
                className="h-16 w-14 rounded-2xl border border-white/15 object-cover object-top"
              />
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-brand-gold">Admin Center</p>
                <h1 className="mt-1 text-2xl font-black leading-tight">Gallery Management</h1>
              </div>
            </div>
            <div className="relative flex flex-wrap gap-2">
              <Link
                href="/gallery"
                className="inline-flex h-11 items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 text-sm font-bold text-white backdrop-blur transition hover:bg-white/20"
                target="_blank"
              >
                <Eye size={16} />
                View Site Gallery
              </Link>
              <button
                type="button"
                onClick={() => setPasswordModalOpen(true)}
                className="inline-flex h-11 items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 text-sm font-bold text-white backdrop-blur transition hover:bg-white/20"
              >
                <KeyRound size={16} />
                Change Password
              </button>
              <button
                type="button"
                onClick={handleLogout}
                className="inline-flex h-11 items-center gap-2 rounded-full bg-white px-4 text-sm font-bold text-brand-ink transition hover:bg-brand-gold"
              >
                <LogOut size={16} />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {notice ? <p className={`mb-5 rounded-2xl border px-4 py-3 text-sm font-semibold ${noticeClass(notice.tone)}`}>{notice.text}</p> : null}

          <div className="mb-5 grid grid-cols-2 rounded-full border border-white bg-white/85 p-1 shadow-soft backdrop-blur sm:w-fit">
            <button
              type="button"
              onClick={() => setActiveTab("library")}
              className={`inline-flex h-11 items-center justify-center gap-2 rounded-full px-4 text-sm font-bold transition ${
                activeTab === "library" ? "bg-brand-ink text-white" : "text-brand-ink hover:bg-brand-blue/10"
              }`}
            >
              <ListChecks size={17} />
              Gallery
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("add")}
              className={`inline-flex h-11 items-center justify-center gap-2 rounded-full px-4 text-sm font-bold transition ${
                activeTab === "add" ? "bg-brand-ink text-white" : "text-brand-ink hover:bg-brand-blue/10"
              }`}
            >
              <Plus size={17} />
              Add Image
            </button>
          </div>

          {activeTab === "add" ? (
            <form
              onSubmit={handleUpload}
              className="grid gap-6 rounded-[2rem] border border-white bg-white/90 p-5 shadow-soft backdrop-blur lg:grid-cols-[0.85fr_1.15fr] lg:p-7"
            >
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-brand-blue">Upload</p>
                <h2 className="mt-3 text-2xl font-black leading-tight text-brand-ink">Add a new gallery image</h2>
                <p className="mt-3 text-sm leading-7 text-stone-600">
                  Add a title, choose a category, and upload a JPG, PNG, or WebP photo. The image is compressed before saving.
                </p>
              </div>
              <div className="grid gap-4">
                <label className="grid gap-2 text-sm font-semibold text-brand-ink">
                  Title
                  <input name="title" className="field-input" placeholder="Kitchen prep, tutor session, family support..." />
                </label>
                <label className="grid gap-2 text-sm font-semibold text-brand-ink">
                  Category
                  <select name="category" defaultValue="" className="field-input">
                    <option value="" disabled>
                      Select category
                    </option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="grid gap-2 text-sm font-semibold text-brand-ink">
                  Image
                  <input
                    ref={fileRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    className="field-input file:mr-4 file:rounded-full file:border-0 file:bg-brand-ink file:px-4 file:py-2 file:text-sm file:font-bold file:text-white"
                    onChange={async (event) => {
                      const file = event.currentTarget.files?.[0];
                      setPreview("");
                      setPreparedImage("");

                      if (!file) return;

                      setPreparingImage(true);
                      setNotice(null);

                      try {
                        const imageData = await compressImage(file);
                        setPreview(imageData);
                        setPreparedImage(imageData);
                      } catch (error) {
                        if (fileRef.current) fileRef.current.value = "";
                        setNotice({
                          tone: "error",
                          text: error instanceof Error ? error.message : "Unable to prepare image."
                        });
                      } finally {
                        setPreparingImage(false);
                      }
                    }}
                  />
                </label>
                {preparingImage ? (
                  <div className="flex items-center gap-3 rounded-3xl border border-brand-sky/30 bg-brand-blue/5 px-4 py-3 text-sm font-semibold text-brand-navy">
                    <Loader2 size={17} className="animate-spin" />
                    Preparing compressed preview...
                  </div>
                ) : null}
                {preview ? (
                  <div className="overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-soft">
                    <img src={preview} alt="Selected gallery preview" className="h-72 w-full object-cover" />
                  </div>
                ) : null}
                <button
                  type="submit"
                  disabled={uploading || preparingImage}
                  className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-brand-ink px-5 text-sm font-bold text-white transition hover:bg-brand-navy disabled:opacity-70"
                >
                  {uploading || preparingImage ? <Loader2 size={18} className="animate-spin" /> : <Upload size={18} />}
                  {preparingImage ? "Preparing Image" : "Add to Gallery"}
                </button>
              </div>
            </form>
          ) : (
            <section className="rounded-[2rem] border border-white bg-white/90 p-4 shadow-soft backdrop-blur sm:p-6">
              <div className="mb-5 flex flex-col gap-3 border-b border-slate-100 pb-5 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.24em] text-brand-blue">Gallery Library</p>
                  <h2 className="mt-2 text-2xl font-black">{items.length} image{items.length === 1 ? "" : "s"}</h2>
                </div>
                <button
                  type="button"
                  onClick={loadGallery}
                  disabled={loading}
                  className="inline-flex h-11 w-fit items-center gap-2 rounded-full bg-brand-blue/10 px-4 text-sm font-bold text-brand-navy transition hover:bg-brand-blue/15 disabled:opacity-60"
                >
                  <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
                  Refresh
                </button>
              </div>

              {items.length ? (
                <div className="grid gap-3">
                  {items.map((item) => (
                    <article key={item.id} className="grid gap-3 rounded-3xl border border-slate-100 bg-white p-3 shadow-sm transition hover:shadow-soft sm:grid-cols-[5rem_1fr_auto] sm:items-center">
                      <button
                        type="button"
                        onClick={() => openItem(item, "view")}
                        className="group grid gap-3 text-left sm:col-span-2 sm:grid-cols-[5rem_1fr] sm:items-center"
                      >
                        <img src={item.imageData} alt={item.title} className="h-24 w-full rounded-2xl object-cover sm:h-20 sm:w-20" />
                        <span>
                          <span className="block text-xs font-bold uppercase tracking-[0.16em] text-brand-blue">{item.category}</span>
                          <span className="mt-1 block text-base font-black leading-tight group-hover:text-brand-blue">{item.title}</span>
                          <span className="mt-1 block text-sm font-medium text-slate-500">{formatDate(item.createdAt)}</span>
                        </span>
                      </button>
                      <div className="flex flex-wrap gap-2 sm:justify-end">
                        <button
                          type="button"
                          onClick={() => openItem(item, "view")}
                          className="inline-flex h-10 items-center gap-2 rounded-full bg-brand-blue/10 px-3 text-sm font-bold text-brand-navy transition hover:bg-brand-blue/15"
                        >
                          <Eye size={16} />
                          View
                        </button>
                        <button
                          type="button"
                          onClick={() => openItem(item, "edit")}
                          className="inline-flex h-10 items-center gap-2 rounded-full bg-brand-gold/20 px-3 text-sm font-bold text-brand-ink transition hover:bg-brand-gold/30"
                        >
                          <Edit3 size={16} />
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(item)}
                          className="inline-flex h-10 items-center gap-2 rounded-full bg-rose-50 px-3 text-sm font-bold text-rose-700 transition hover:bg-rose-100"
                        >
                          <Trash2 size={16} />
                          Delete
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
              ) : (
                <div className="grid min-h-[22rem] place-items-center rounded-[2rem] border border-dashed border-brand-sky/40 bg-brand-blue/5 p-8 text-center">
                  <div>
                    <Camera size={36} className="mx-auto text-brand-teal" />
                    <h3 className="mt-4 text-xl font-black">No gallery images yet.</h3>
                    <p className="mt-2 text-sm leading-6 text-stone-600">Uploaded photos will appear here and on the public gallery.</p>
                    <button
                      type="button"
                      onClick={() => setActiveTab("add")}
                      className="mt-5 inline-flex h-11 items-center gap-2 rounded-full bg-brand-ink px-4 text-sm font-bold text-white transition hover:bg-brand-navy"
                    >
                      <ImagePlus size={16} />
                      Add First Image
                    </button>
                  </div>
                </div>
              )}
            </section>
          )}
        </div>
      </section>

      {selectedItem ? (
        <div className="fixed inset-0 z-50 grid place-items-center bg-brand-ink/75 px-4 py-6 backdrop-blur-sm">
          <div className="max-h-[92vh] w-full max-w-4xl overflow-auto rounded-[2rem] bg-white shadow-soft">
            <div className="flex items-center justify-between gap-4 border-b border-slate-100 p-4 sm:p-5">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-brand-blue">
                  {itemModalMode === "edit" ? "Edit image" : selectedItem.category}
                </p>
                <h2 className="mt-1 text-xl font-black leading-tight">{selectedItem.title}</h2>
              </div>
              <button
                type="button"
                onClick={() => setSelectedItem(null)}
                className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-slate-100 text-slate-600 transition hover:bg-brand-blue/10 hover:text-brand-navy"
                aria-label="Close gallery item"
              >
                <X size={19} />
              </button>
            </div>

            {itemModalMode === "edit" ? (
              <form onSubmit={handleEdit} className="grid gap-5 p-4 sm:p-5 lg:grid-cols-[1fr_0.9fr]">
                <img src={selectedItem.imageData} alt={selectedItem.title} className="h-[22rem] w-full rounded-[1.5rem] object-cover" />
                <div className="grid content-start gap-4">
                  <label className="grid gap-2 text-sm font-semibold text-brand-ink">
                    Title
                    <input name="title" defaultValue={selectedItem.title} className="field-input" />
                  </label>
                  <label className="grid gap-2 text-sm font-semibold text-brand-ink">
                    Category
                    <select name="category" defaultValue={selectedItem.category} className="field-input">
                      {!categories.includes(selectedItem.category) ? (
                        <option value={selectedItem.category}>{selectedItem.category}</option>
                      ) : null}
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </label>
                  <button
                    type="submit"
                    disabled={savingItem}
                    className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-brand-ink px-5 text-sm font-bold text-white transition hover:bg-brand-navy disabled:opacity-70"
                  >
                    {savingItem ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                    Save Changes
                  </button>
                </div>
              </form>
            ) : (
              <div className="grid gap-5 p-4 sm:p-5 lg:grid-cols-[1fr_0.75fr]">
                <img src={selectedItem.imageData} alt={selectedItem.title} className="max-h-[32rem] w-full rounded-[1.5rem] object-cover" />
                <div className="grid content-start gap-4">
                  <div className="rounded-[1.5rem] bg-brand-blue/5 p-4">
                    <p className="text-xs font-bold uppercase tracking-[0.24em] text-brand-blue">Details</p>
                    <h3 className="mt-3 text-2xl font-black">{selectedItem.title}</h3>
                    <p className="mt-2 text-sm font-semibold text-slate-500">{selectedItem.category}</p>
                    <p className="mt-4 text-sm leading-7 text-stone-600">Added: {formatDate(selectedItem.createdAt)}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => setItemModalMode("edit")}
                      className="inline-flex h-11 items-center gap-2 rounded-full bg-brand-ink px-4 text-sm font-bold text-white transition hover:bg-brand-navy"
                    >
                      <Edit3 size={16} />
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(selectedItem)}
                      className="inline-flex h-11 items-center gap-2 rounded-full bg-rose-50 px-4 text-sm font-bold text-rose-700 transition hover:bg-rose-100"
                    >
                      <Trash2 size={16} />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : null}

      {passwordModalOpen ? (
        <div className="fixed inset-0 z-50 grid place-items-center bg-brand-ink/75 px-4 py-6 backdrop-blur-sm">
          <form onSubmit={handlePasswordChange} className="w-full max-w-lg rounded-[2rem] bg-white p-5 text-brand-ink shadow-soft sm:p-6">
            <div className="mb-6 flex items-start justify-between gap-4 border-b border-slate-100 pb-5">
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-brand-blue/10 text-brand-blue">
                  <KeyRound size={22} />
                </span>
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.24em] text-brand-blue">Security</p>
                  <h2 className="mt-1 text-xl font-black">Change Password</h2>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setPasswordModalOpen(false)}
                className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-slate-100 text-slate-600 transition hover:bg-brand-blue/10 hover:text-brand-navy"
                aria-label="Close password modal"
              >
                <X size={19} />
              </button>
            </div>
            <div className="grid gap-4">
              <PasswordInput name="currentPassword" label="Current Password" autoComplete="current-password" />
              <PasswordInput name="nextPassword" label="New Password" autoComplete="new-password" />
              <PasswordInput name="confirmPassword" label="Confirm New Password" autoComplete="new-password" />
            </div>
            <button
              type="submit"
              disabled={changingPassword}
              className="mt-5 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-brand-ink px-5 text-sm font-bold text-white transition hover:bg-brand-navy disabled:opacity-70"
            >
              {changingPassword ? <Loader2 size={18} className="animate-spin" /> : <ShieldCheck size={18} />}
              Save Password
            </button>
          </form>
        </div>
      ) : null}
    </main>
  );
}
