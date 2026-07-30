import { useEffect, useState, type FormEvent } from "react";
import {
    createCategory,
    deleteCategory,
    getCategories,
    updateCategory,
} from "../api/categories"
import type { Category } from "../types";
import { Link } from "react-router-dom"

export function CategoriesPage() {
    const [categories, setCategories] = useState<Category[]>([])
    const [newName, setNewName] = useState("")
    const [error, setError] = useState<string | null>(null)
    const [editingId, setEditingId] = useState<number | null>(null)
    const [editingName, setEditingName] = useState("")

    async function loadCategories() {
        try {
            const data = await getCategories()
            setCategories(data)
        } catch {
            setError("Não foi possível carregar as categorias")
        }
    }

    useEffect(() => {
        loadCategories()
    }, [])

    async function handleCreate(event: FormEvent) {
        event.preventDefault()
        setError(null)

        try {
            await createCategory(newName)
            setNewName("")
            await loadCategories()
        } catch {
            setError("Não foi possível criar a categoria")
        }
    }

    async function handleDelete(id: number) {
        setError(null)

        try {
            await deleteCategory(id)
            await loadCategories()
        } catch {
            setError("Não foi possível excluir. Verifique se não há produtos vinculados a essa categoria.")
        }
    }

    function startEditing(category: Category) {
        setEditingId(category.id)
        setEditingName(category.name)
    }

    async function handleUpdate(id: number) {
        setError(null)

        try {
            await updateCategory(id, editingName)
            setEditingId(null)
            await loadCategories()
        } catch {
            setError("Não foi possível atualizar a categoria.")
        }
    }

    return (
        <div className="p-8">
            <h1 className="mb-6 text-2x1 font-bold text-gray-800">Categorias</h1>

            <form onSubmit={handleCreate} className="mb-6 grid max-w-2xl grid-cols-2 gap-3 rounded-lg bg-white p-4 shadow">
                <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">Nome</label>
                    <input
                        type="text"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        required
                        className="w-full rounded border border-gray-300 px-3 py-2"
                    />
                </div>
            
                <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">Categoria</label>
                    <select
                        value={form.category_id}
                        onChange={(e) => setForm({ ...form, category_id: Number(e.target.value) })}
                        required
                        className="w-full rounded border border-gray-300 px-3 py-2"
                    >
                        <option value={0} disabled>
                            Selecione
                        </option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>
                    
                <div className="col-span-2">
                    <label className="mb-1 block text-sm font-medium text-gray-700">Descrição</label>
                    <input
                        type="text"
                        value={form.description ?? ""}
                        onChange={(e) => setForm({ ...form, description: e.target.value })}
                        className="w-full rounded border border-gray-300 px-3 py-2"
                    />
                </div>
                    
                <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">Preço</label>
                    <input
                        type="number"
                        step="0.01"
                        value={form.price}
                        onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
                        required
                        className="w-full rounded border border-gray-300 px-3 py-2"
                    />
                </div>
                    
                <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">Tamanho (ex: M, 500g)</label>
                    <input
                        type="text"
                        value={form.size ?? ""}
                        onChange={(e) => setForm({ ...form, size: e.target.value })}
                        className="w-full rounded border border-gray-300 px-3 py-2"
                    />
                </div>
                    
                <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">Estoque inicial</label>
                    <input
                        type="number"
                        value={form.stock_quantity}
                        onChange={(e) => setForm({ ...form, stock_quantity: Number(e.target.value) })}
                        className="w-full rounded border border-gray-300 px-3 py-2"
                    />
                </div>
                    
                <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">Estoque mínimo</label>
                    <input
                        type="number"
                        value={form.minimum_stock}
                        onChange={(e) => setForm({ ...form, minimum_stock: Number(e.target.value) })}
                        className="w-full rounded border border-gray-300 px-3 py-2"
                    />
                </div>
                    
                <button
                    type="submit"
                    className="col-span-2 rounded bg-blue-600 py-2 font-medium text-white hover:bg-blue-700"
                >
                    Adicionar produto
                </button>
            </form>

            {error && <p className="mb-4 text-sm text-red-600">{error}</p>}

            <ul className="space-y-2">
                {categories.map((category) => (
                    <li 
                        key={category.id}
                        className="flex items-center justify-between rounded-lg bg-white p-4 shadow"
                    >
                        {editingId === category.id ? (
                            <>
                                <input 
                                    type="text" 
                                    value={editingName}
                                    onChange={(e) => setEditingName(e.target.value)}
                                    className="mr-2 flex-1 rounded border border-gray-300 px-2 py-1"
                                    />
                                    <div className="flex-gap-2">
                                        <button
                                            onClick={() => handleUpdate(category.id)}
                                            className="text-sm font-medium text-blue-600 hover:text-blue-800"
                                        >
                                            Salvar
                                        </button>
                                        <button
                                            onClick={() => setEditingId(null)}
                                            className="text-sm font-medium text-gray-500 hover:text-gray-700"
                                        >
                                            Cancelar
                                        </button>
                                    </div>
                                </>
                        ) : (
                            <>
                                <Link
                                    to={`/products?category_id=${category.id}`}
                                    className="font-medium text-gray-800 hover:text-blue-600 hover:underline"
                                >
                                    {category.name}
                                </Link>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => startEditing(category)}
                                        className="text-sm font-medium text-blue-600 hover:text-blue-800"
                                    >
                                        Editar
                                    </button>
                                    <button
                                        onClick={() => handleDelete(category.id)}
                                        className="text-sm font-medium text-blue-600 hover:text-blue-800"
                                    >   
                                        Excluir
                                    </button>
                                </div>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    )
}