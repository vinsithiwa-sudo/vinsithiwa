"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { 
  createProduct as createProductService, 
  updateProduct as updateProductService, 
  deleteProduct as deleteProductService 
} from "@/services/products.service";
import { updateOrderStatus as updateOrderStatusService } from "@/services/orders.service";
import type { ProductFormValues } from "@/lib/validations";
import { OrderStatus } from "@prisma/client";
import { upsertSetting, createTheme, updateTheme, deleteTheme, createSubtheme, updateSubtheme, deleteSubtheme, createSpace, updateSpace, deleteSpace, createPanel, updatePanel, deletePanel, createBankAccount, updateBankAccount, deleteBankAccount, toggleBankAccount } from "@/services/admin.service";

export async function createProductAction(data: ProductFormValues) {
  try {
    await createProductService(data);
    revalidatePath("/", "layout");
    return { success: true };
  } catch (error) {
    console.error("Failed to create product:", error);
    return { error: "Failed to create product" };
  }
}

export async function updateProductAction(id: string, data: ProductFormValues) {
  try {
    await updateProductService(id, data);
    revalidatePath("/", "layout");
    return { success: true };
  } catch (error) {
    console.error("Failed to update product:", error);
    return { error: "Failed to update product" };
  }
}

export async function deleteProductAction(id: string) {
  try {
    await deleteProductService(id);
    revalidatePath("/admin/products");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete product:", error);
    return { error: "Failed to delete product" };
  }
}

export async function updateOrderStatusAction(id: string, status: OrderStatus, paymentVerified?: boolean) {
  try {
    await updateOrderStatusService(id, status, paymentVerified);
    revalidatePath("/admin/orders");
    revalidatePath(`/admin/orders/${id}`);
    return { success: true };
  } catch (error) {
    console.error("Failed to update order status:", error);
    return { error: "Failed to update order status" };
  }
}

export async function updateSettingsAction(key: string, value: string) {
  try {
    await upsertSetting(key, value);
    revalidatePath("/admin/settings");
    return { success: true };
  } catch (error) {
    console.error("Failed to update settings:", error);
    return { error: "Failed to update settings" };
  }
}

// ─────────────────────────────────────────────
// TAXONOMY ACTIONS
// ─────────────────────────────────────────────

export async function createThemeAction(name: string, slug: string) {
  try {
    await createTheme(name, slug);
    revalidatePath("/admin/themes");
    return { success: true };
  } catch (error: any) {
    return { error: error.message || "Failed to create theme" };
  }
}

export async function updateThemeAction(id: string, name: string, slug: string) {
  try {
    await updateTheme(id, name, slug);
    revalidatePath("/admin/themes");
    return { success: true };
  } catch (error: any) {
    return { error: error.message || "Failed to update theme" };
  }
}

export async function deleteThemeAction(id: string) {
  try {
    await deleteTheme(id);
    revalidatePath("/admin/themes");
    return { success: true };
  } catch (error: any) {
    return { error: error.message || "Failed to delete theme" };
  }
}

export async function createSubthemeAction(name: string, slug: string, themeId: string) {
  try {
    await createSubtheme(name, slug, themeId);
    revalidatePath("/admin/subthemes");
    return { success: true };
  } catch (error: any) {
    return { error: error.message || "Failed to create subtheme" };
  }
}

export async function updateSubthemeAction(id: string, name: string, slug: string, themeId: string) {
  try {
    await updateSubtheme(id, name, slug, themeId);
    revalidatePath("/admin/subthemes");
    return { success: true };
  } catch (error: any) {
    return { error: error.message || "Failed to update subtheme" };
  }
}

export async function deleteSubthemeAction(id: string) {
  try {
    await deleteSubtheme(id);
    revalidatePath("/admin/subthemes");
    return { success: true };
  } catch (error: any) {
    return { error: error.message || "Failed to delete subtheme" };
  }
}

export async function createSpaceAction(name: string, slug: string, icon?: string, description?: string, color?: string) {
  try {
    await createSpace(name, slug, icon, description, color);
    revalidatePath("/admin/spaces");
    return { success: true };
  } catch (error: any) {
    return { error: error.message || "Failed to create space" };
  }
}

export async function updateSpaceAction(id: string, name: string, slug: string, icon?: string, description?: string, color?: string) {
  try {
    await updateSpace(id, name, slug, icon, description, color);
    revalidatePath("/admin/spaces");
    return { success: true };
  } catch (error: any) {
    return { error: error.message || "Failed to update space" };
  }
}

export async function deleteSpaceAction(id: string) {
  try {
    await deleteSpace(id);
    revalidatePath("/admin/spaces");
    return { success: true };
  } catch (error: any) {
    return { error: error.message || "Failed to delete space" };
  }
}

// ─────────────────────────────────────────────
// PANEL ACTIONS
// ─────────────────────────────────────────────

export async function createPanelAction(name: string, count: number) {
  try {
    await createPanel(name, count);
    revalidatePath("/admin/panels");
    return { success: true };
  } catch (error: any) {
    return { error: error.message || "Failed to create panel" };
  }
}

export async function updatePanelAction(id: string, name: string, count: number) {
  try {
    await updatePanel(id, name, count);
    revalidatePath("/admin/panels");
    return { success: true };
  } catch (error: any) {
    return { error: error.message || "Failed to update panel" };
  }
}

export async function deletePanelAction(id: string) {
  try {
    await deletePanel(id);
    revalidatePath("/admin/panels");
    return { success: true };
  } catch (error: any) {
    return { error: error.message || "Failed to delete panel" };
  }
}

// ─────────────────────────────────────────────
// BANK ACCOUNT ACTIONS
// ─────────────────────────────────────────────

export async function createBankAccountAction(data: { bankName: string; accountName: string; accountNo: string; branch?: string }) {
  try {
    await createBankAccount(data);
    revalidatePath("/admin/bank-accounts");
    return { success: true };
  } catch (error: any) {
    return { error: error.message || "Failed to create bank account" };
  }
}

export async function updateBankAccountAction(id: string, data: { bankName: string; accountName: string; accountNo: string; branch?: string }) {
  try {
    await updateBankAccount(id, data);
    revalidatePath("/admin/bank-accounts");
    return { success: true };
  } catch (error: any) {
    return { error: error.message || "Failed to update bank account" };
  }
}

export async function deleteBankAccountAction(id: string) {
  try {
    await deleteBankAccount(id);
    revalidatePath("/admin/bank-accounts");
    return { success: true };
  } catch (error: any) {
    return { error: error.message || "Failed to delete bank account" };
  }
}

export async function toggleBankAccountAction(id: string, isActive: boolean) {
  try {
    await toggleBankAccount(id, isActive);
    revalidatePath("/admin/bank-accounts");
    return { success: true };
  } catch (error: any) {
    return { error: error.message || "Failed to toggle bank account status" };
  }
}

