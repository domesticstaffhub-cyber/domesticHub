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

function noticeClass(tone: Notice["tone"]) {
  if (tone === "success") return "border-brand-teal/30 bg-brand-teal/10 text-brand-teal";
  if (tone === "error") return "border-brand-clay/30 bg-brand-clay/10 text-brand-ink";
  return "border-brand-saffron/40 bg-brand-saffron/15 text-brand-ink";
}

function formatDate(value?: number) {
  if (!value) return "Recently added";

  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric"
  }).format(value);
}

function readFile(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ""));
    reader.onerror = () => reject(new Error("Unable to read image."));
    reader.readAsDataURL(file);
  });
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

  const source = await readFile(file);
  const image = await loadImage(source);
  const maxSide = 1300;
  const ratio = Math.min(1, maxSide / Math.max(image.width, image.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(image.width * ratio));
  canvas.height = Math.max(1, Math.round(image.height * ratio));
  const context = canvas.getContext("2d");

  if (!context) {
    throw new Error("Unable to prepare image.");
  }

  context.drawImage(image, 0, 0, canvas.width, canvas.height);

  let quality = 0.82;
  let output = canvas.toDataURL("image/jpeg", quality);

  while (output.length > 820_000 && quality > 0.42) {
    quality -= 0.08;
    output = canvas.toDataURL("image/jpeg", quality);
  }

  if (output.length > 850_000) {
    throw new Error("Image is still too large. Try a smaller photo.");
  }

  return output;
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
    <label className="grid gap-2 text-sm font-black text-brand-ink">
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
          className="absolute right-2 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center text-brand-ink/70 transition hover:text-brand-ink"
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
      const imageData = await compressImage(file);
      const response = await fetch("/api/cms/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: String(formData.get("title") || ""),
          category: String(formData.get("category") || ""),
          imageData
        })
      });
      const result = await response.json();

      if (!response.ok || !result.ok) {
        setNotice({ tone: "error", text: result.message || "Unable to add image." });
        return;
      }

      setItems((current) => [result.item, ...current]);
      setPreview("");
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
      const response = await fetch(`/api/cms/gallery/${item.id}`, { method: "DELETE" });
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
      const response = await fetch(`/api/cms/gallery/${selectedItem.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
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
    await fetch("/api/cms/logout", { method: "POST" });
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
      <main className="grid min-h-screen place-items-center bg-brand-ink px-4 text-white">
        <div className="flex items-center gap-3 text-sm font-black uppercase tracking-[0.18em]">
          <Loader2 size={18} className="animate-spin text-brand-saffron" />
          Loading Admin Center
        </div>
      </main>
    );
  }

  if (authState === "locked") {
    return (
      <main className="min-h-screen bg-brand-ink px-4 py-8 text-white sm:px-6 lg:px-8">
        <section className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="mx-auto w-full max-w-xl lg:mx-0">
            <Image
              src="/images/services/full_logo.jpeg"
              width={96}
              height={120}
              alt="Domestic Staffing Hub logo"
              className="h-24 w-20 border border-white/10 object-cover object-top shadow-soft"
              priority
            />
            <p className="mt-8 section-kicker text-brand-saffron">Domestic Staffing Hub</p>
            <h1 className="mt-3 text-4xl font-black leading-tight sm:text-5xl">Admin Center</h1>
            <p className="mt-5 max-w-xl text-sm leading-7 text-white/70">
              Manage gallery photos, keep live service pictures organized, and update the public gallery without editing code.
            </p>
          </div>

          <form onSubmit={handleLogin} className="mx-auto w-full max-w-lg border border-white/10 bg-white p-5 text-brand-ink shadow-hard sm:p-7">
            <div className="mb-6 flex items-center gap-4 border-b border-brand-line pb-5">
              <span className="grid h-12 w-12 shrink-0 place-items-center border border-brand-ink bg-brand-saffron text-brand-ink">
                <LockKeyhole size={23} />
              </span>
              <div>
                <p className="section-kicker">Secure Login</p>
                <h2 className="mt-1 text-2xl font-black leading-tight">Welcome back</h2>
              </div>
            </div>
            <div className="grid gap-4">
              <label className="grid gap-2 text-sm font-black">
                Username
                <input name="username" autoComplete="username" defaultValue="Admin" className="field-input" />
              </label>
              <PasswordInput name="password" label="Password" autoComplete="current-password" />
            </div>
            {notice ? <p className={`mt-4 border px-4 py-3 text-sm font-bold ${noticeClass(notice.tone)}`}>{notice.text}</p> : null}
            <button
              type="submit"
              disabled={loading}
              className="mt-5 inline-flex h-12 w-full items-center justify-center gap-2 border border-brand-ink bg-brand-ink px-5 text-sm font-black text-white transition hover:bg-brand-clay disabled:opacity-70"
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
    <main className="min-h-screen bg-brand-paper text-brand-ink">
      <section className="border-b border-brand-ink bg-brand-ink px-4 py-5 text-white sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-4">
            <Image
              src="/images/services/full_logo.jpeg"
              width={64}
              height={80}
              alt="Domestic Staffing Hub logo"
              className="h-16 w-14 border border-white/10 object-cover object-top"
            />
            <div>
              <p className="section-kicker text-brand-saffron">Admin Center</p>
              <h1 className="mt-1 text-2xl font-black leading-tight">Gallery Management</h1>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/gallery"
              className="inline-flex h-11 items-center gap-2 border border-white/20 px-4 text-sm font-black text-white transition hover:border-brand-saffron"
              target="_blank"
            >
              <Eye size={16} />
              View Site Gallery
            </Link>
            <button
              type="button"
              onClick={() => setPasswordModalOpen(true)}
              className="inline-flex h-11 items-center gap-2 border border-white/20 px-4 text-sm font-black text-white transition hover:border-brand-saffron"
            >
              <KeyRound size={16} />
              Change Password
            </button>
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex h-11 items-center gap-2 border border-white bg-white px-4 text-sm font-black text-brand-ink transition hover:bg-brand-saffron"
            >
              <LogOut size={16} />
              Sign Out
            </button>
          </div>
        </div>
      </section>

      <section className="px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {notice ? <p className={`mb-5 border px-4 py-3 text-sm font-bold ${noticeClass(notice.tone)}`}>{notice.text}</p> : null}

          <div className="mb-5 grid grid-cols-2 border border-brand-ink bg-white p-1 shadow-soft sm:w-fit">
            <button
              type="button"
              onClick={() => setActiveTab("library")}
              className={`inline-flex h-11 items-center justify-center gap-2 px-4 text-sm font-black transition ${
                activeTab === "library" ? "bg-brand-ink text-white" : "text-brand-ink hover:bg-brand-paper"
              }`}
            >
              <ListChecks size={17} />
              Gallery
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("add")}
              className={`inline-flex h-11 items-center justify-center gap-2 px-4 text-sm font-black transition ${
                activeTab === "add" ? "bg-brand-ink text-white" : "text-brand-ink hover:bg-brand-paper"
              }`}
            >
              <Plus size={17} />
              Add Image
            </button>
          </div>

          {activeTab === "add" ? (
            <form onSubmit={handleUpload} className="grid gap-6 border border-brand-ink bg-white p-5 shadow-hard lg:grid-cols-[0.85fr_1.15fr] lg:p-6">
              <div>
                <p className="section-kicker">Upload</p>
                <h2 className="mt-3 text-2xl font-black leading-tight">Add a new gallery image</h2>
                <p className="mt-3 text-sm leading-7 text-stone-600">
                  Add a title, choose a category, and upload a photo. The image is compressed before saving.
                </p>
              </div>
              <div className="grid gap-4">
                <label className="grid gap-2 text-sm font-black">
                  Title
                  <input name="title" className="field-input" placeholder="Kitchen prep, tutor session, family support..." />
                </label>
                <label className="grid gap-2 text-sm font-black">
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
                <label className="grid gap-2 text-sm font-black">
                  Image
                  <input
                    ref={fileRef}
                    type="file"
                    accept="image/*"
                    className="field-input file:mr-4 file:border-0 file:bg-brand-ink file:px-4 file:py-2 file:text-sm file:font-black file:text-white"
                    onChange={async (event) => {
                      const file = event.currentTarget.files?.[0];
                      setPreview(file ? await readFile(file) : "");
                    }}
                  />
                </label>
                {preview ? (
                  <div className="overflow-hidden border border-brand-line bg-brand-bone">
                    <img src={preview} alt="Selected gallery preview" className="h-72 w-full object-cover" />
                  </div>
                ) : null}
                <button
                  type="submit"
                  disabled={uploading}
                  className="inline-flex h-12 w-full items-center justify-center gap-2 border border-brand-ink bg-brand-ink px-5 text-sm font-black text-white transition hover:bg-brand-clay disabled:opacity-70"
                >
                  {uploading ? <Loader2 size={18} className="animate-spin" /> : <Upload size={18} />}
                  Add to Gallery
                </button>
              </div>
            </form>
          ) : (
            <section className="border border-brand-ink bg-white p-4 shadow-hard sm:p-6">
              <div className="mb-5 flex flex-col gap-3 border-b border-brand-line pb-5 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="section-kicker">Gallery Library</p>
                  <h2 className="mt-2 text-2xl font-black">{items.length} image{items.length === 1 ? "" : "s"}</h2>
                </div>
                <button
                  type="button"
                  onClick={loadGallery}
                  disabled={loading}
                  className="inline-flex h-11 w-fit items-center gap-2 border border-brand-line bg-brand-bone px-4 text-sm font-black text-brand-ink transition hover:border-brand-ink disabled:opacity-60"
                >
                  <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
                  Refresh
                </button>
              </div>

              {items.length ? (
                <div className="grid gap-3">
                  {items.map((item) => (
                    <article key={item.id} className="grid gap-3 border border-brand-line bg-brand-bone p-3 sm:grid-cols-[5rem_1fr_auto] sm:items-center">
                      <button
                        type="button"
                        onClick={() => openItem(item, "view")}
                        className="group grid gap-3 text-left sm:col-span-2 sm:grid-cols-[5rem_1fr] sm:items-center"
                      >
                        <img src={item.imageData} alt={item.title} className="h-24 w-full border border-brand-line object-cover sm:h-20 sm:w-20" />
                        <span>
                          <span className="block text-xs font-black uppercase tracking-[0.16em] text-brand-clay">{item.category}</span>
                          <span className="mt-1 block text-base font-black leading-tight group-hover:text-brand-clay">{item.title}</span>
                          <span className="mt-1 block text-sm font-bold text-stone-500">{formatDate(item.createdAt)}</span>
                        </span>
                      </button>
                      <div className="flex flex-wrap gap-2 sm:justify-end">
                        <button
                          type="button"
                          onClick={() => openItem(item, "view")}
                          className="inline-flex h-10 items-center gap-2 border border-brand-line bg-white px-3 text-sm font-black transition hover:border-brand-ink"
                        >
                          <Eye size={16} />
                          View
                        </button>
                        <button
                          type="button"
                          onClick={() => openItem(item, "edit")}
                          className="inline-flex h-10 items-center gap-2 border border-brand-line bg-white px-3 text-sm font-black transition hover:border-brand-ink"
                        >
                          <Edit3 size={16} />
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(item)}
                          className="inline-flex h-10 items-center gap-2 border border-brand-line bg-white px-3 text-sm font-black transition hover:border-brand-ink"
                        >
                          <Trash2 size={16} />
                          Delete
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
              ) : (
                <div className="grid min-h-[22rem] place-items-center border border-dashed border-brand-line bg-brand-paper p-8 text-center">
                  <div>
                    <Camera size={36} className="mx-auto text-brand-teal" />
                    <h3 className="mt-4 text-xl font-black">No gallery images yet.</h3>
                    <p className="mt-2 text-sm leading-6 text-stone-600">Uploaded photos will appear here and on the public gallery.</p>
                    <button
                      type="button"
                      onClick={() => setActiveTab("add")}
                      className="mt-5 inline-flex h-11 items-center gap-2 border border-brand-ink bg-white px-4 text-sm font-black transition hover:bg-brand-saffron"
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
          <div className="max-h-[92vh] w-full max-w-4xl overflow-auto border border-brand-ink bg-white shadow-hard">
            <div className="flex items-center justify-between gap-4 border-b border-brand-line p-4 sm:p-5">
              <div>
                <p className="section-kicker">{itemModalMode === "edit" ? "Edit image" : selectedItem.category}</p>
                <h2 className="mt-1 text-xl font-black leading-tight">{selectedItem.title}</h2>
              </div>
              <button
                type="button"
                onClick={() => setSelectedItem(null)}
                className="grid h-10 w-10 shrink-0 place-items-center border border-brand-line transition hover:border-brand-ink"
                aria-label="Close gallery item"
              >
                <X size={19} />
              </button>
            </div>

            {itemModalMode === "edit" ? (
              <form onSubmit={handleEdit} className="grid gap-5 p-4 sm:p-5 lg:grid-cols-[1fr_0.9fr]">
                <img src={selectedItem.imageData} alt={selectedItem.title} className="h-[22rem] w-full border border-brand-line object-cover" />
                <div className="grid content-start gap-4">
                  <label className="grid gap-2 text-sm font-black">
                    Title
                    <input name="title" defaultValue={selectedItem.title} className="field-input" />
                  </label>
                  <label className="grid gap-2 text-sm font-black">
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
                    className="inline-flex h-12 items-center justify-center gap-2 border border-brand-ink bg-brand-ink px-5 text-sm font-black text-white transition hover:bg-brand-clay disabled:opacity-70"
                  >
                    {savingItem ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                    Save Changes
                  </button>
                </div>
              </form>
            ) : (
              <div className="grid gap-5 p-4 sm:p-5 lg:grid-cols-[1fr_0.75fr]">
                <img src={selectedItem.imageData} alt={selectedItem.title} className="max-h-[32rem] w-full border border-brand-line object-cover" />
                <div className="grid content-start gap-4">
                  <div className="border border-brand-line bg-brand-bone p-4">
                    <p className="section-kicker">Details</p>
                    <h3 className="mt-3 text-2xl font-black">{selectedItem.title}</h3>
                    <p className="mt-2 text-sm font-bold text-stone-500">{selectedItem.category}</p>
                    <p className="mt-4 text-sm leading-7 text-stone-600">Added: {formatDate(selectedItem.createdAt)}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => setItemModalMode("edit")}
                      className="inline-flex h-11 items-center gap-2 border border-brand-ink bg-brand-ink px-4 text-sm font-black text-white transition hover:bg-brand-clay"
                    >
                      <Edit3 size={16} />
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(selectedItem)}
                      className="inline-flex h-11 items-center gap-2 border border-brand-line bg-white px-4 text-sm font-black text-brand-ink transition hover:border-brand-ink"
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
          <form onSubmit={handlePasswordChange} className="w-full max-w-lg border border-brand-ink bg-white p-5 text-brand-ink shadow-hard sm:p-6">
            <div className="mb-6 flex items-start justify-between gap-4 border-b border-brand-line pb-5">
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center border border-brand-ink bg-brand-teal text-white">
                  <KeyRound size={22} />
                </span>
                <div>
                  <p className="section-kicker">Security</p>
                  <h2 className="mt-1 text-xl font-black">Change Password</h2>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setPasswordModalOpen(false)}
                className="grid h-10 w-10 shrink-0 place-items-center border border-brand-line transition hover:border-brand-ink"
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
              className="mt-5 inline-flex h-12 w-full items-center justify-center gap-2 border border-brand-ink bg-brand-ink px-5 text-sm font-black text-white transition hover:bg-brand-clay disabled:opacity-70"
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
