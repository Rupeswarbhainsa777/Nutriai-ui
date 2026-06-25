import { useEffect, useState } from "react";
import {
    getAllRecipes,
    addRecipe,
    updateRecipe,
    deleteRecipe,
} from "../../service/Recipes.js";

const EMPTY_FORM = {
    name: "",
    description: "",
    imageUrl: "",
    calories: "",
    protein: "",
    carbs: "",
};

/* ─── Input ──────────────────────────────────────────────────────────────── */
const Input = ({ label, name, value, onChange, type = "text", placeholder }) => (
    <div className="flex flex-col gap-1.5">
        <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
            {label}
        </label>
        <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required
            className="px-3.5 py-2.5 rounded-md border border-gray-300 bg-white text-gray-900 text-sm outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-all duration-150 hover:border-gray-400"
        />
    </div>
);

const Textarea = ({ label, name, value, onChange, placeholder }) => (
    <div className="flex flex-col gap-1.5">
        <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
            {label}
        </label>
        <textarea
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            rows={3}
            required
            className="px-3.5 py-2.5 rounded-md border border-gray-300 bg-white text-gray-900 text-sm outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-all duration-150 resize-none hover:border-gray-400"
        />
    </div>
);

/* ─── Modal ──────────────────────────────────────────────────────────────── */
const Modal = ({ title, onClose, children }) => (
    <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm"
        onClick={onClose}
    >
        <div
            className="w-full max-w-lg bg-white rounded-lg shadow-2xl max-h-[90vh] overflow-y-auto border border-gray-200"
            onClick={(e) => e.stopPropagation()}
        >
            <div className="flex items-center justify-between px-6 pt-5">
                <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
                <button
                    onClick={onClose}
                    className="w-8 h-8 rounded-md bg-gray-100 text-gray-400 hover:bg-gray-200 hover:text-gray-600 flex items-center justify-center text-sm transition-colors duration-150"
                >
                    ✕
                </button>
            </div>
            {children}
        </div>
    </div>
);

/* ─── Delete Confirmation ─────────────────────────────────────────────────── */
const DeleteModal = ({ recipe, onConfirm, onCancel, loading }) => (
    <Modal title="Delete Recipe" onClose={onCancel}>
        <p className="px-6 pt-4 pb-2 text-sm text-gray-500">
            Remove <span className="font-semibold text-gray-900">{recipe.name}</span> permanently?
            This cannot be undone.
        </p>
        <div className="flex justify-end gap-3 px-6 py-5">
            <button
                onClick={onCancel}
                disabled={loading}
                className="px-5 py-2.5 rounded-md border border-gray-300 text-sm font-medium text-gray-600 hover:border-gray-400 hover:text-gray-900 disabled:opacity-50 transition-colors duration-150"
            >
                Cancel
            </button>
            <button
                onClick={onConfirm}
                disabled={loading}
                className="px-5 py-2.5 rounded-md bg-red-600 text-white text-sm font-medium hover:bg-red-700 disabled:opacity-50 transition-colors duration-150"
            >
                {loading ? "Deleting…" : "Delete"}
            </button>
        </div>
    </Modal>
);

/* ─── Recipe Form ─────────────────────────────────────────────────────────── */
const RecipeForm = ({ initial, onSubmit, onCancel, loading }) => {
    const [form, setForm] = useState(initial ?? EMPTY_FORM);

    const handle = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

    const submit = (e) => {
        e.preventDefault();
        onSubmit({
            ...form,
            calories: Number(form.calories),
            protein: Number(form.protein),
            carbs: Number(form.carbs),
        });
    };

    return (
        <form onSubmit={submit} className="flex flex-col gap-4 px-6 py-5">
            <div className="grid grid-cols-2 gap-4">
                <Input label="Recipe Name" name="name" value={form.name} onChange={handle} placeholder="e.g. Mango Chia Pudding" />
                <Input label="Image URL" name="imageUrl" value={form.imageUrl} onChange={handle} placeholder="https://…" />
            </div>
            <Textarea
                label="Description"
                name="description"
                value={form.description}
                onChange={handle}
                placeholder="A short, enticing description…"
            />
            <div className="grid grid-cols-3 gap-4">
                <Input label="Calories (kcal)" name="calories" type="number" value={form.calories} onChange={handle} placeholder="320" />
                <Input label="Protein (g)" name="protein" type="number" value={form.protein} onChange={handle} placeholder="24" />
                <Input label="Carbs (g)" name="carbs" type="number" value={form.carbs} onChange={handle} placeholder="40" />
            </div>
            <div className="flex justify-end gap-3 pt-1">
                <button
                    type="button"
                    onClick={onCancel}
                    disabled={loading}
                    className="px-5 py-2.5 rounded-md border border-gray-300 text-sm font-medium text-gray-600 hover:border-gray-400 hover:text-gray-900 disabled:opacity-50 transition-colors duration-150"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={loading}
                    className="px-5 py-2.5 rounded-md bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 disabled:opacity-50 active:scale-[0.98] transition-all duration-150"
                >
                    {loading ? "Saving…" : initial ? "Save Changes" : "Add Recipe"}
                </button>
            </div>
        </form>
    );
};

/* ─── Recipe Card ─────────────────────────────────────────────────────────── */
const RecipeCard = ({ recipe, onEdit, onDelete }) => (
    <article className="group bg-white rounded-lg overflow-hidden border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all duration-150 flex flex-col">
        {/* Image */}
        <div className="relative h-48 overflow-hidden flex-shrink-0">
            <img
                src={recipe.imageUrl}
                alt={recipe.name}
                className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

            {/* Hover actions */}
            <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 -translate-y-1 group-hover:translate-y-0 transition-all duration-150">
                <button
                    onClick={() => onEdit(recipe)}
                    title="Edit"
                    className="w-8 h-8 rounded-md bg-white/90 backdrop-blur-sm text-gray-700 hover:bg-white text-sm flex items-center justify-center shadow-sm transition-colors duration-150"
                >
                    ✎
                </button>
                <button
                    onClick={() => onDelete(recipe)}
                    title="Delete"
                    className="w-8 h-8 rounded-md bg-white/90 backdrop-blur-sm text-red-500 hover:bg-red-50 text-sm flex items-center justify-center shadow-sm transition-colors duration-150"
                >
                    ✕
                </button>
            </div>
        </div>

        {/* Body */}
        <div className="p-5 flex flex-col flex-1">
            <h2 className="text-base font-semibold text-gray-900 leading-snug mb-1">
                {recipe.name}
            </h2>
            <p className="text-sm text-gray-500 mb-4 flex-1 line-clamp-2">
                {recipe.description}
            </p>

            {/* Nutrition stats */}
            <div className="grid grid-cols-3 border-t border-gray-100 pt-3">
                <div className="text-center">
                    <p className="text-sm font-bold text-gray-900">{recipe.calories}</p>
                    <p className="text-[10px] uppercase tracking-widest text-gray-400">kcal</p>
                </div>
                <div className="text-center border-x border-gray-100">
                    <p className="text-sm font-bold text-gray-900">{recipe.protein}g</p>
                    <p className="text-[10px] uppercase tracking-widest text-gray-400">protein</p>
                </div>
                <div className="text-center">
                    <p className="text-sm font-bold text-gray-900">{recipe.carbs}g</p>
                    <p className="text-[10px] uppercase tracking-widest text-gray-400">carbs</p>
                </div>
            </div>
        </div>
    </article>
);

/* ─── Toast ───────────────────────────────────────────────────────────────── */
const Toast = ({ message, type }) => (
    <div
        className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-[200] px-6 py-3 rounded-md text-sm font-medium shadow-xl pointer-events-none transition-all
            ${type === "error" ? "bg-red-600 text-white" : "bg-gray-900 text-white"}`}
    >
        {message}
    </div>
);

/* ═══════════════════════════════════════════════════════════════════════════
   Main Page
═══════════════════════════════════════════════════════════════════════════ */
const Recipes = () => {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [modal, setModal] = useState(null); // null | "add" | "edit" | "delete"
    const [selected, setSelected] = useState(null);
    const [toast, setToast] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const filteredRecipes = recipes.filter((recipe) =>
        recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recipe.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    /* ── Fetch ── */
    const fetchRecipes = async () => {
        setLoading(true);
        try {
            const data = await getAllRecipes();
            setRecipes(data);
        } catch {
            showToast("Failed to load recipes.", "error");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchRecipes(); }, []);

    /* ── Toast ── */
    const showToast = (message, type = "success") => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    };

    /* ── Add ── */
    const handleAdd = async (formData) => {
        setSubmitting(true);
        try {
            await addRecipe(formData);
            await fetchRecipes();
            closeModal();
            showToast("Recipe added!");
        } catch {
            showToast("Failed to add recipe.", "error");
        } finally {
            setSubmitting(false);
        }
    };

    /* ── Edit ── */
    const openEdit = (recipe) => { setSelected(recipe); setModal("edit"); };

    const handleEdit = async (formData) => {
        setSubmitting(true);
        try {
            await updateRecipe(selected.id, formData);
            await fetchRecipes();
            closeModal();
            showToast("Recipe updated!");
        } catch {
            showToast("Failed to update recipe.", "error");
        } finally {
            setSubmitting(false);
        }
    };

    /* ── Delete ── */
    const openDelete = (recipe) => { setSelected(recipe); setModal("delete"); };

    const handleDelete = async () => {
        setSubmitting(true);
        try {
            await deleteRecipe(selected.id);
            await fetchRecipes();
            closeModal();
            showToast("Recipe deleted.");
        } catch {
            showToast("Failed to delete recipe.", "error");
        } finally {
            setSubmitting(false);
        }
    };

    const closeModal = () => { setModal(null); setSelected(null); };

    return (
        <div className="min-h-screen bg-gray-50">

            {/* ── Header ── */}
            <header className="sticky top-0 z-10 bg-white border-b border-gray-200">
                <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-medium mb-1">
                            Today's Collection
                        </p>
                        <h1 className="text-3xl font-bold text-gray-900 leading-none">
                            Recipes
                        </h1>
                    </div>
                    <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center">
                        <input
                            type="text"
                            placeholder="Search recipes..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full md:w-72 px-4 py-2.5 rounded-md border border-gray-300 bg-white text-sm outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 hover:border-gray-400 transition-all duration-150"
                        />

                        <button
                            onClick={() => setModal("add")}
                            className="px-5 py-2.5 rounded-md bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 active:scale-[0.98] transition-all duration-150 whitespace-nowrap"
                        >
                            + New Recipe
                        </button>
                    </div>

                </div>
            </header>

            {/* ── Main ── */}
            <main className="max-w-6xl mx-auto px-6 py-10">

                {/* Loading spinner */}
                {loading && (
                    <div className="flex flex-col items-center gap-4 py-24 text-gray-400">
                        <div className="w-8 h-8 border-2 border-gray-200 border-t-gray-900 rounded-full animate-spin" />
                        <p className="text-sm">Loading recipes…</p>
                    </div>
                )}

                {/* Recipe grid */}
                {!loading && filteredRecipes.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredRecipes.map((r) => (
                            <RecipeCard
                                key={r.id}
                                recipe={r}
                                onEdit={openEdit}
                                onDelete={openDelete}
                            />
                        ))}
                    </div>
                )}

                {/* Empty state */}
                {!loading && filteredRecipes.length === 0 && (
                    <div className="flex flex-col items-center gap-3 py-24 text-gray-400">
                        <span className="text-5xl">🍽️</span>
                        <p className="text-base">No recipes yet. Add your first one!</p>
                    </div>
                )}
            </main>

            {/* ── Modals ── */}
            {modal === "add" && (
                <Modal title="Add New Recipe" onClose={closeModal}>
                    <RecipeForm onSubmit={handleAdd} onCancel={closeModal} loading={submitting} />
                </Modal>
            )}
            {modal === "edit" && selected && (
                <Modal title="Edit Recipe" onClose={closeModal}>
                    <RecipeForm
                        initial={selected}
                        onSubmit={handleEdit}
                        onCancel={closeModal}
                        loading={submitting}
                    />
                </Modal>
            )}
            {modal === "delete" && selected && (
                <DeleteModal
                    recipe={selected}
                    onConfirm={handleDelete}
                    onCancel={closeModal}
                    loading={submitting}
                />
            )}

            {/* ── Toast ── */}
            {toast && <Toast message={toast.message} type={toast.type} />}
        </div>
    );
};

export default Recipes;