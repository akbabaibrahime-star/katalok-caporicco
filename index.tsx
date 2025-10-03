

import React, { useState, useMemo, useRef, forwardRef, useEffect, useCallback } from 'react';
import { createRoot } from 'react-dom/client';

// FIX: Declare the global supabase object to fix the TypeScript error.
declare const supabase: any;
// FIX: Declare global libraries loaded via script tags.
declare const html2canvas: any;
declare const XLSX: any;

// --- SUPABASE CLIENT SETUP ---
const SUPABASE_URL = 'https://nlgmojnbkethwirgmpwh.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5sZ21vam5ia2V0aHdpcmdtcHdoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc5MjQ1ODEsImV4cCI6MjA3MzUwMDU4MX0.j_vBJrDalubGqlOGT3zLyIKf6LAJ_I5N5MPjEe2MwA0';
const db = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);


const generateId = () => `id_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

const colorNameMap = {
  // English
  'black': '#000000', 'white': '#ffffff', 'red': '#ff0000', 'green': '#008000', 'blue': '#0000ff', 'yellow': '#ffff00', 'cyan': '#00ffff', 'magenta': '#ff00ff', 'gray': '#808080', 'grey': '#808080', 'silver': '#c0c0c0', 'maroon': '#800000', 'olive': '#808000', 'purple': '#800080', 'teal': '#008080', 'navy': '#000080', 'orange': '#ffa500', 'pink': '#ffc0cb', 'brown': '#a52a2a', 'beige': '#f5f5dc', 'ivory': '#fffff0', 'khaki': '#f0e68c', 'lavender': '#e6e6fa', 'indigo': '#4b0082', 'ecru': '#c2b280', 'cream': '#fffdd0', 'charcoal': '#36454f', 'anthracite': '#383e42', 'mint': '#3eb489', 'burgundy': '#800020', 'mustard': '#ffdb58',
  // Turkish
  'siyah': '#000000', 'beyaz': '#ffffff', 'kırmızı': '#ff0000', 'yeşil': '#008000', 'mavi': '#0000ff', 'sarı': '#ffff00', 'gri': '#808080', 'gümüş': '#7c8288', 'bordo': '#890007', 'lacivert': '#000080', 'turuncu': '#ffa500', 'pembe': '#ffc0cb', 'kahverengi': '#a52a2a', 'bej': '#f5f5dc', 'ekru': '#c2b280', 'krem': '#fffdd0', 'antrasit': '#383e42', 'nane': '#3eb489', 'hardal': '#ffdb58', 'marin': '#1b2966', 'safran': '#f4c430', 'saks': '#0000c8',
  'kiremit': '#6d342d', 'füme': '#4c4e51', 'lila': '#685168', 'gri melanj': '#c0c0c0', 'nefti': '#013220', 'petrol': '#216477', 'tarçın': '#7b3f00', 'haki': '#4b5320', 'küf': '#78866b',
  // Russian
  'черный': '#000000', 'белый': '#ffffff', 'красный': '#ff0000', 'зеленый': '#008000', 'синий': '#0000ff', 'желтый': '#ffff00', 'серый': '#808080', 'серебряный': '#c0c0c0', 'бордовый': '#800020', 'темно-синий': '#000080', 'оранжевый': '#ffa500', 'розовый': '#ffc0cb', 'коричневый': '#a52a2a', 'бежевый': '#f5f5dc', 'горчичный': '#ffdb58',
};

// --- TRANSLATIONS ---
const translations = {
  en: {
    searchPlaceholder: "Search by product name or code...",
    cart: "Cart",
    addToCart: "Add",
    outOfStock: "Out of Stock",
    shoppingCart: "Shopping Cart",
    emptyCart: "Your cart is empty.",
    total: "Total",
    shareOrder: "Share Order as Image",
    sharingOrder: "Preparing...",
    storeName: "CAPORİCCO",
    selectOptions: "Select Options",
    admin: "Admin",
    viewCatalog: "View Catalog",
    productManagement: "Product Management",
    updateProducts: "Update Products",
    cancel: "Cancel",
    close: "Close",
    addNewProduct: "Add New Product",
    editProduct: "Edit Product",
    edit: "Edit",
    productName: "Product Name",
    productCode: "Product Code",
    variants: "Color Variants",
    colorName: "Color Name",
    colorCode: "Color Code",
    productImage: "Product Image",
    uploadImage: "Upload Image",
    addVariant: "Add Color Variant",
    removeVariant: "Remove Variant",
    series_packs: "Series / Packs",
    seriesName: "Series Name",
    price: "Series Price",
    currency: "Currency",
    stock: "Stock",
    addSeries: "Add Series",
    removeSeries: "Remove Series",
    saveChanges: "Save Changes",
    delete: "Delete",
    deleteConfirm: "Are you sure you want to delete this?",
    new: "New",
    productManager: "Products",
    seriesTemplates: "Series Templates",
    storeSettings: "Store Settings",
    storeNameLabel: "Store Name",
    storeLogoLabel: "Store Logo",
    brandLabel: "Brand",
    manufacturerTitleLabel: "Manufacturer Title",
    originLabel: "Origin",
    uploadLogo: "Upload Logo",
    addNewTemplate: "Add New Template",
    templateName: "Template Name",
    editTemplate: "Edit Template",
    seriesNamesHelp: "Series Names (one per line)",
    applyTemplate: "Apply Template",
    itemTypes: "Item Types",
    totalPacks: "Total Packs",
    totalUnits: "Total Units",
    adminLogin: "Admin Login",
    enterPassword: "Enter Admin Password",
    submit: "Submit",
    incorrectPassword: "Incorrect password. Please try again.",
    duplicateVariant: "Duplicate Variant",
    perPiece: "/ piece",
    unitPrice: "Unit Price",
    galleryView: "Gallery View",
    zoomHint: "Pinch or Ctrl+Scroll to zoom",
    itemsSelected: "{count} items selected",
    bulkAddToCart: "Add to Cart",
    shareSelected: "Share",
    configureItems: "Configure Items for Cart",
    confirmAddToCart: "Confirm & Add to Cart",
    select: "Select",
    filters: "Filters",
    resetFilters: "Reset",
    season: "Season",
    collarType: "Collar Type",
    series: "Series",
    allSeason: "All Seasons",
    summer: "Summer",
    winter: "Winter",
    polo: "Polo",
    crewNeck: "Crew Neck",
    buttonCollar: "Button Collar",
    vNeck: "V-Neck",
    shirtCollar: "Shirt Collar",
    mockNeck: "Mock Neck",
    cardigan: "Cardigan",
    other: "Other",
    albums: "Albums",
    allItems: "All Items",
    backToAlbums: "← Back",
    colors: "colors",
    collarTypes: "Collar Types",
    addNewCollarType: "Add New Collar Type",
    editCollarType: "Edit Collar Type",
    collarTypeName: "Collar Type Name",
    quickStockUpdate: "Quick Stock Update",
    set: "Set",
    setToZero: "Set to 0",
    quickStock: "Quick Stock",
    searchByCodeAndColor: "Search by Product Code and Color...",
    setAllStockToZero: "Set All Stock to 0",
    stockUpdateConfirm: "Are you sure you want to set all stock for this color variant to 0?",
    stockUpdateConfirmWithValue: "Are you sure you want to set all stock for this color variant to {value}?",
    stockUpdatedSuccess: "Stock updated successfully!",
    totalStock: "Total Stock",
    templatesAndTypes: "Templates & Types",
    content: "Content",
    contentPercentage: "Content %",
    gender: "Gender",
    male: "Male",
    female: "Female",
    unisex: "Unisex",
    child: "Child",
    boy: "Boy",
    girl: "Girl",
    contentTemplates: "Content Templates",
    addNewContentTemplate: "Add New Content Template",
    editContentTemplate: "Edit Content Template",
    contentTemplateName: "Content Name (e.g. 80% Cotton, 20% Poly)",
    genderTemplates: "Gender Templates",
    addNewGenderTemplate: "Add New Gender Template",
    editGenderTemplate: "Edit Gender Template",
    genderTemplateName: "Gender Name",
    downloadExcel: "Download as Excel",
    downloading: "Preparing Excel...",
    shortsManagement: "Shorts Management",
    addVideo: "Add Video",
    changeVideo: "Change Video",
    removeVideo: "Remove Video",
    removeVideoConfirm: "Are you sure you want to remove the video for this product?",
    uploadFromDevice: "Upload from device",
    pasteVideoUrl: "Edit URL",
    saveUrl: "Save URL",
    uploadingVideo: "Uploading...",
    videoUploadSuccess: "Video uploaded successfully!",
    videoUpdateFailed: "Failed to update video.",
    searchByProductNameOrCode: "Search by product name or code...",
    videoUrlVariant: "Video URL (Variant)",
    allRightsReserved: "All rights reserved.",
    discount: "Discount",
    discountedProducts: "Discounted Products",
    a2hsTitle: "Install {appName} App",
    a2hsDescription: "Add to your home screen for a better experience.",
    a2hsInstall: "Install",
    a2hsIosInstruction: "Tap the Share button, then 'Add to Home Screen'.",
    storeNameColor: "Store Name Color",
    changeAdminPassword: "Change Admin Password",
    currentPassword: "Current Password",
    newPassword: "New Password",
    confirmNewPassword: "Confirm New Password",
    changePassword: "Change Password",
    passwordChangedSuccess: "Password changed successfully!",
    passwordChangeFailed: "Failed to change password.",
    fillAllPasswordFields: "Please fill all password fields.",
    newPasswordsDoNotMatch: "New passwords do not match.",
    currentPasswordIncorrect: "Current password is incorrect.",
    login: "Login",
    createAccount: "Create Account",
    emailAddress: "Email Address",
    password: "Password",
    storeUrl: "Store URL",
    subdomainHelp: "Use only lowercase letters, numbers, and dashes.",
    loginPrompt: "Already have an account?",
    signupPrompt: "Don't have an account?",
    logout: "Logout",
    authHeader: "Admin Panel",
    or: "OR",
    loginToYourAccount: "Login to your Account",
    createNewStore: "Create a New Store",
  },
  tr: {
    searchPlaceholder: "Ürün adı veya koduyla ara...",
    cart: "Sepet",
    addToCart: "Ekle",
    outOfStock: "Tükendi",
    shoppingCart: "Alışveriş Sepeti",
    emptyCart: "Sepetiniz boş.",
    total: "Toplam",
    shareOrder: "Siparişi Resim Olarak Paylaş",
    sharingOrder: "Hazırlanıyor...",
    storeName: "CAPORİCCO",
    selectOptions: "Seçenekleri Gör",
    admin: "Yönetim",
    viewCatalog: "Kataloğu Gör",
    productManagement: "Ürün Yönetimi",
    updateProducts: "Ürünleri Güncelle",
    cancel: "İptal",
    close: "Kapat",
    addNewProduct: "Yeni Ürün Ekle",
    editProduct: "Ürünü Düzenle",
    edit: "Düzenle",
    productName: "Ürün Adı",
    productCode: "Ürün Kodu",
    variants: "Renk Seçenekleri",
    colorName: "Renk Adı",
    colorCode: "Renk Kodu",
    productImage: "Ürün Resmi",
    uploadImage: "Resim Yükle",
    addVariant: "Renk Seçeneği Ekle",
    removeVariant: "Varyantı Kaldır",
    series_packs: "Seriler / Paketler",
    seriesName: "Seri Adı",
    price: "Seri Fiyatı",
    currency: "Para Birimi",
    stock: "Stok",
    addSeries: "Seri Ekle",
    removeSeries: "Seriyi Kaldır",
    saveChanges: "Değişiklikleri Kaydet",
    delete: "Sil",
    deleteConfirm: "Bunu silmek istediğinizden emin misiniz?",
    new: "Yeni",
    productManager: "Ürünler",
    seriesTemplates: "Seri Şablonları",
    storeSettings: "Mağaza Ayarları",
    storeNameLabel: "Mağaza Adı",
    storeLogoLabel: "Mağaza Logosu",
    brandLabel: "Marka",
    manufacturerTitleLabel: "Üretici Ünvanı",
    originLabel: "Menşei",
    uploadLogo: "Logo Yükle",
    addNewTemplate: "Yeni Şablon Ekle",
    templateName: "Şablon Adı",
    editTemplate: "Şablonu Düzenle",
    seriesNamesHelp: "Seri Adları (her satıra bir tane)",
    applyTemplate: "Şablonu Uygula",
    itemTypes: "Çeşit",
    totalPacks: "Toplam Seri",
    totalUnits: "Toplam Adet",
    adminLogin: "Yönetici Girişi",
    enterPassword: "Yönetici Şifresini Girin",
    submit: "Giriş Yap",
    incorrectPassword: "Hatalı şifre. Lütfen tekrar deneyin.",
    duplicateVariant: "Varyantı Kopyala",
    perPiece: "/ adet",
    unitPrice: "Adet Fiyatı",
    galleryView: "Galeri Görünümü",
    zoomHint: "Yakınlaştırmak için sıkıştırın veya Ctrl+Kaydırma kullanın",
    itemsSelected: "{count} ürün seçildi",
    bulkAddToCart: "Sepete Ekle",
    shareSelected: "Paylaş",
    configureItems: "Ürünleri Sepet İçin Yapılandır",
    confirmAddToCart: "Onayla ve Sepete Ekle",
    select: "Seç",
    filters: "Filtreler",
    resetFilters: "Sıfırla",
    season: "Sezon",
    collarType: "Yaka Tipi",
    series: "Seri",
    allSeason: "Tüm Sezonlar",
    summer: "Yazlık",
    winter: "Kışlık",
    polo: "Polo Yaka",
    crewNeck: "Bisiklet Yaka",
    buttonCollar: "Çıt Çıt Yaka",
    vNeck: "V Yaka",
    shirtCollar: "Gömlek Yaka",
    mockNeck: "Yarım Balıkçıl",
    cardigan: "Hırka",
    other: "Diğer",
    albums: "Albümler",
    allItems: "Tümünü Gör",
    backToAlbums: "← Geri",
    colors: "renk",
    collarTypes: "Yaka Tipleri",
    addNewCollarType: "Yeni Yaka Tipi Ekle",
    editCollarType: "Yaka Tipini Düzenle",
    collarTypeName: "Yaka Tipi Adı",
    quickStockUpdate: "Hızlı Stok Güncelleme",
    set: "Ayarla",
    setToZero: "Sıfırla",
    quickStock: "Hızlı Stok",
    searchByCodeAndColor: "Ürün Kodu ve Renk ile Ara...",
    setAllStockToZero: "Tüm Stoğu Sıfırla",
    stockUpdateConfirm: "Bu renk varyantı için tüm stoğu 0 olarak ayarlamak istediğinizden emin misiniz?",
    stockUpdateConfirmWithValue: "Bu renk varyantı için tüm stoğu {value} olarak ayarlamak istediğinizden emin misiniz?",
    stockUpdatedSuccess: "Stok başarıyla güncellendi!",
    totalStock: "Toplam Stok",
    templatesAndTypes: "Şablonlar & Tipler",
    content: "İçerik",
    contentPercentage: "İçerik %",
    gender: "Cinsiyet",
    male: "Erkek",
    female: "Kadın",
    unisex: "Üniseks",
    child: "Çocuk",
    boy: "Erkek Çocuk",
    girl: "Kız Çocuk",
    contentTemplates: "İçerik Şablonları",
    addNewContentTemplate: "Yeni İçerik Şablonu Ekle",
    editContentTemplate: "İçerik Şablonunu Düzenle",
    contentTemplateName: "İçerik Adı (örn: %80 Pamuk, %20 Poly)",
    genderTemplates: "Cinsiyet Şablonları",
    addNewGenderTemplate: "Yeni Cinsiyet Şablonu Ekle",
    editGenderTemplate: "Cinsiyet Şablonunu Düzenle",
    genderTemplateName: "Cinsiyet Adı",
    downloadExcel: "Excel İndir",
    downloading: "Hazırlanıyor...",
    shortsManagement: "Shorts Yönetimi",
    addVideo: "Video Ekle",
    changeVideo: "Videoyu Değiştir",
    removeVideo: "Videoyu Kaldır",
    removeVideoConfirm: "Bu ürünün videosunu kaldırmak istediğinizden emin misiniz?",
    uploadFromDevice: "Cihazdan yükle",
    pasteVideoUrl: "URL Düzenle",
    saveUrl: "URL'yi Kaydet",
    uploadingVideo: "Yükleniyor...",
    videoUploadSuccess: "Video başarıyla yüklendi!",
    videoUpdateFailed: "Video güncellenemedi.",
    searchByProductNameOrCode: "Ürün adı veya koduyla ara...",
    videoUrlVariant: "Video URL (Varyant)",
    allRightsReserved: "Tüm hakları saklıdır.",
    discount: "İndirim",
    discountedProducts: "İndirimli Ürünler",
    a2hsTitle: "{appName} Uygulamasını Yükle",
    a2hsDescription: "Daha iyi bir deneyim için ana ekranınıza ekleyin.",
    a2hsInstall: "Yükle",
    a2hsIosInstruction: "Paylaş düğmesine, ardından 'Ana Ekrana Ekle'ye dokunun.",
    storeNameColor: "Mağaza Adı Rengi",
    changeAdminPassword: "Yönetici Şifresini Değiştir",
    currentPassword: "Mevcut Şifre",
    newPassword: "Yeni Şifre",
    confirmNewPassword: "Yeni Şifreyi Onayla",
    changePassword: "Şifreyi Değiştir",
    passwordChangedSuccess: "Şifre başarıyla değiştirildi!",
    passwordChangeFailed: "Şifre değiştirilemedi.",
    fillAllPasswordFields: "Lütfen tüm şifre alanlarını doldurun.",
    newPasswordsDoNotMatch: "Yeni şifreler eşleşmiyor.",
    currentPasswordIncorrect: "Mevcut şifre yanlış.",
    login: "Giriş Yap",
    createAccount: "Hesap Oluştur",
    emailAddress: "E-posta Adresi",
    password: "Şifre",
    storeUrl: "Mağaza URL (Subdomain)",
    subdomainHelp: "Sadece küçük harf, rakam ve tire kullanın.",
    loginPrompt: "Zaten bir hesabınız var mı?",
    signupPrompt: "Hesabınız yok mu?",
    logout: "Çıkış Yap",
    authHeader: "Yönetim Paneli",
    or: "VEYA",
    loginToYourAccount: "Hesabınıza Giriş Yapın",
    createNewStore: "Yeni Mağaza Oluşturun",
  },
  ru: {
    searchPlaceholder: "Поиск по названию или коду товара...",
    cart: "Корзина",
    addToCart: "Добавить",
    outOfStock: "Нет в наличии",
    shoppingCart: "Корзина",
    emptyCart: "Ваша корзина пуста.",
    total: "Итого",
    shareOrder: "Поделиться заказом как изображение",
    sharingOrder: "Подготовка...",
    storeName: "CAPORİCCO",
    selectOptions: "Выбрать опции",
    admin: "Админ",
    viewCatalog: "Посмотреть каталог",
    productManagement: "Управление продуктами",
    updateProducts: "Обновить продукты",
    cancel: "Отмена",
    close: "Закрыть",
    addNewProduct: "Добавить новый продукт",
    editProduct: "Редактировать продукт",
    edit: "Редактировать",
    productName: "Название продукта",
    productCode: "Код продукта",
    variants: "Цветовые варианты",
    colorName: "Название цвета",
    colorCode: "Код цвета",
    productImage: "Изображение продукта",
    uploadImage: "Загрузить изображение",
    addVariant: "Добавить вариант цвета",
    removeVariant: "Удалить вариант",
    series_packs: "Серии / Пакеты",
    seriesName: "Название серии",
    price: "Цена Серии",
    currency: "Валюта",
    stock: "Запас",
    addSeries: "Добавить серию",
    removeSeries: "Удалить серию",
    saveChanges: "Сохранить изменения",
    delete: "Удалить",
    deleteConfirm: "Вы уверены, что хотите удалить это?",
    new: "Новый",
    productManager: "Продукты",
    seriesTemplates: "Шаблоны серий",
    storeSettings: "Настройки магазина",
    storeNameLabel: "Название магазина",
    storeLogoLabel: "Логотип магазина",
    brandLabel: "Бренд",
    manufacturerTitleLabel: "Название производителя",
    originLabel: "Происхождение",
    uploadLogo: "Загрузить логотип",
    addNewTemplate: "Добавить новый шаблон",
    templateName: "Название шаблона",
    editTemplate: "Редактировать шаблон",
    seriesNamesHelp: "Названия серий (по одному на строку)",
    applyTemplate: "Применить шаблон",
    itemTypes: "Видов товара",
    totalPacks: "Всего серий",
    totalUnits: "Всего единиц",
    adminLogin: "Вход для администратора",
    enterPassword: "Введите пароль администратора",
    submit: "Войти",
    incorrectPassword: "Неверный пароль. Пожалуйста, попробуйте еще раз.",
    duplicateVariant: "Дублировать вариант",
    perPiece: "/ шт.",
    unitPrice: "Цена за шт.",
    galleryView: "Галерея",
    zoomHint: "Используйте щипок или Ctrl + прокрутку для масштабирования",
    itemsSelected: "Выбрано {count} товаров",
    bulkAddToCart: "Добавить в корзину",
    shareSelected: "Поделиться",
    configureItems: "Настроить товары для корзины",
    confirmAddToCart: "Подтвердить и добавить в корзину",
    select: "Выбрать",
    filters: "Фильтры",
    resetFilters: "Сбросить",
    season: "Сезон",
    collarType: "Тип воротника",
    series: "Серия",
    allSeason: "Все сезоны",
    summer: "Лето",
    winter: "Зима",
    polo: "Поло воротник",
    crewNeck: "Круглый вырез",
    buttonCollar: "Кнопочные",
    vNeck: "Мысик",
    shirtCollar: "Воротник-рубашка",
    mockNeck: "Водолазка",
    cardigan: "Кардиган",
    other: "Другое",
    albums: "Альбомы",
    allItems: "Все товары",
    backToAlbums: "← Назад",
    colors: "цветов",
    collarTypes: "Типы воротников",
    addNewCollarType: "Добавить новый тип воротника",
    editCollarType: "Редактировать тип воротника",
    collarTypeName: "Название типа воротника",
    quickStockUpdate: "Быстрое обновление запасов",
    set: "Установить",
    setToZero: "Установить 0",
    quickStock: "Быстрые запасы",
    searchByCodeAndColor: "Поиск по коду товара и цвету...",
    setAllStockToZero: "Обнулить весь сток",
    stockUpdateConfirm: "Вы уверены, что хотите обнулить весь сток для этого цветового варианта?",
    stockUpdateConfirmWithValue: "Вы уверены, что хотите установить весь сток для этого цветового варианта на {value}?",
    stockUpdatedSuccess: "Сток успешно обновлен!",
    totalStock: "Общий сток",
    templatesAndTypes: "Шаблоны и Типы",
    content: "Состав",
    contentPercentage: "Состав %",
    gender: "Пол",
    male: "Мужской",
    female: "Женский",
    unisex: "Унисекс",
    child: "Ребенок",
    boy: "Мальчик",
    girl: "Девочка",
    contentTemplates: "Шаблоны состава",
    addNewContentTemplate: "Добавить новый шаблон состава",
    editContentTemplate: "Редактировать шаблон состава",
    contentTemplateName: "Название состава (например, 80% хлопок, 20% поли)",
    genderTemplates: "Шаблоны пола",
    addNewGenderTemplate: "Добавить новый шаблон пола",
    editGenderTemplate: "Редактировать шаблон пола",
    genderTemplateName: "Название пола",
    downloadExcel: "Скачать как Excel",
    downloading: "Подготовка...",
    shortsManagement: "Управление Shorts",
    addVideo: "Добавить видео",
    changeVideo: "Изменить видео",
    removeVideo: "Удалить видео",
    removeVideoConfirm: "Вы уверены, что хотите удалить видео для этого товара?",
    uploadFromDevice: "Загрузить с устройства",
    pasteVideoUrl: "Изменить URL",
    saveUrl: "Сохранить URL",
    uploadingVideo: "Загрузка...",
    videoUploadSuccess: "Видео успешно загружено!",
    videoUpdateFailed: "Не удалось обновить видео.",
    searchByProductNameOrCode: "Поиск по названию или коду товара...",
    videoUrlVariant: "URL видео (вариант)",
    allRightsReserved: "Все права защищены.",
    discount: "Скидка",
    discountedProducts: "Товары со скидкой",
    a2hsTitle: "Установить {appName}",
    a2hsDescription: "Добавьте на главный экран для удобства.",
    a2hsInstall: "Установить",
    a2hsIosInstruction: "Нажмите значок «Поделиться», а затем «Добавить на главный экран».",
    storeNameColor: "Цвет названия магазина",
    changeAdminPassword: "Изменить пароль администратора",
    currentPassword: "Текущий пароль",
    newPassword: "Новый пароль",
    confirmNewPassword: "Подтвердите новый пароль",
    changePassword: "Изменить пароль",
    passwordChangedSuccess: "Пароль успешно изменен!",
    passwordChangeFailed: "Не удалось изменить пароль.",
    fillAllPasswordFields: "Пожалуйста, заполните все поля пароля.",
    newPasswordsDoNotMatch: "Новые пароли не совпадают.",
    currentPasswordIncorrect: "Текущий пароль неверен.",
    login: "Войти",
    createAccount: "Создать аккаунт",
    emailAddress: "Адрес электронной почты",
    password: "Пароль",
    storeUrl: "URL магазина",
    subdomainHelp: "Используйте только строчные буквы, цифры и дефисы.",
    loginPrompt: "Уже есть аккаунт?",
    signupPrompt: "Нет аккаунта?",
    logout: "Выйти",
    authHeader: "Панель администратора",
    or: "ИЛИ",
    loginToYourAccount: "Войдите в свой аккаунт",
    createNewStore: "Создать новый магазин",
  },
};

// --- HELPER COMPONENTS & UTILS ---
const getTransformedImageUrl = (
  originalUrl: string | null | undefined,
  options: { width: number; height: number; resize?: string; quality?: number }
): string => {
  if (!originalUrl || !originalUrl.includes('supabase.co/storage/v1/object/public')) {
    return originalUrl || ''; // Return original if not a Supabase public URL or is null
  }

  try {
    const url = new URL(originalUrl);
    url.pathname = url.pathname.replace('/object/public/', '/render/image/public/');
    
    url.searchParams.set('width', String(options.width));
    url.searchParams.set('height', String(options.height));
    url.searchParams.set('resize', options.resize || 'cover');
    url.searchParams.set('quality', String(options.quality || 80));
    
    return url.toString();
  } catch (error) {
    console.error("Failed to transform image URL:", originalUrl, error);
    return originalUrl; // Return original on failure
  }
};


// FIX: Accept props to allow passing className.
const SearchIcon = (props: any) => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>;
const CartIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>;
const PlusIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>;
const MinusIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line></svg>;
const Trash2Icon = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>;
const CopyIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>;
const ViewListIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 6h13"></path><path d="M8 12h13"></path><path d="M8 18h13"></path><path d="M3 6h.01"></path><path d="M3 12h.01"></path><path d="M3 18h.01"></path></svg>;
const ViewGridIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>;
const ViewGalleryIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><path d="M3 9h18M9 21V9"></path></svg>;
const FilterIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>;
const CheckIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>;
const ShareIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>;
const CartPlusIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path><line x1="12" y1="9" x2="12" y2="15"></line><line x1="9" y1="12" x2="15" y2="12"></line></svg>;
const ChevronLeftIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>;
const ChevronRightIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>;
const XIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>;
const AdminIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>;
const DownloadIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>;
const ArrowLeftIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>;
const VideoIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 8-6 4 6 4V8Z"></path><rect x="2" y="6" width="14" height="12" rx="2" ry="2"></rect></svg>;
const VolumeOnIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>;
const VolumeOffIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>;
const ShareIconIos = () => <svg style={{ marginRight: '12px', flexShrink: 0 }} width="32" height="32" viewBox="0 0 21 21" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16.5 7.5l-5.964-5.964a.05.05 0 00-.071 0L4.5 7.5"></path><path d="M10.5 1.5v12"></path><path d="M7.5 6.5h-4a2 2 0 00-2 2v9a2 2 0 002 2h13a2 2 0 002-2v-9a2 2 0 00-2-2h-4"></path></svg>;


const getTranslationKey = (str: string | undefined): string => {
    if (!str) return '';
    return str.toLowerCase()
        .replace(/[\s-](.)/g, (_match, group1) => group1.toUpperCase())
        .replace(/[\s-]/g, '');
};

const formatCurrency = (amount: number, currency: string): string => {
    const options: { [key: string]: { symbol: string; format: (v: number) => string } } = {
        'USD': { symbol: '$', format: (v) => `$${v.toFixed(2)}` },
        'EUR': { symbol: '€', format: (v) => `€${v.toFixed(2)}` },
        'TRY': { symbol: '₺', format: (v) => `₺${v.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` },
    };
    return options[currency]?.format(amount) || `${amount}`;
};

const getUnitsPerSeries = (seriesName: string): number => {
    if (!seriesName) return 1;
    // Priority 1: Check for explicit piece counts in parentheses, e.g., (1-2-2-1)
    const numericMatch = seriesName.match(/\(([\d\s+\-]+)\)/);
    if (numericMatch && numericMatch[1]) {
        if (/^[\d\s+\-]+$/.test(numericMatch[1])) {
            const numbers = numericMatch[1].split(/[+\-]/).map(n => parseInt(n.trim(), 10));
            if (numbers.every(n => !isNaN(n))) {
                const sum = numbers.reduce((s, num) => s + num, 0);
                if (sum > 0) return sum;
            }
        }
    }

    // Priority 2: Check for patterns like "2S 2M 1L" or "2XL-3XL"
    // This regex looks for tokens that could be quantities (like 2S) or compound sizes (like 2XL)
    const distributionRegex = /(\d+[a-zA-Z]+)/g;
    const sizeDistributionMatches = seriesName.match(distributionRegex);
    
    if (sizeDistributionMatches && sizeDistributionMatches.length > 0) {
        // Check if the string is composed *only* of these kinds of tokens.
        const nonMatchPart = seriesName.replace(distributionRegex, '').replace(/[\s,-]/g, '');
        if (nonMatchPart.length === 0) {
            // All parts of the string look like "2S" or "2XL". Now we differentiate.
            const total = sizeDistributionMatches.reduce((sum, match) => {
                // A size name like "2XL", "3XL" is a single unit, not a quantity of 2.
                // We identify these as any token starting with a number and ending in XL.
                if (/^\d+XL/i.test(match)) {
                    return sum + 1;
                }

                // Otherwise, it's a quantity distribution like "2S", "1M".
                const numPart = parseInt(match, 10);
                return sum + (isNaN(numPart) ? 1 : numPart); // Use 1 as fallback for safety.
            }, 0);

            if (total > 0) {
                return total;
            }
        }
    }


    // Priority 3: Count common size abbreviations if no other pattern matched.
    const sizes = seriesName.match(/\b(XS|S|M|L|XL|XXL|2XL|3XL|4XL|5XL|6XL|7XL|8XL)\b/gi);
    if (sizes && sizes.length > 0) {
        return sizes.length;
    }

    // Fallback for names we can't parse.
    return 1;
};

const parseSeriesString = (seriesName: string) => {
    if (!seriesName) return [];

    const nameMatch = seriesName.match(/^([^(]+)/);
    const quantitiesMatch = seriesName.match(/\(([^)]+)\)/);

    if (!nameMatch) return [];

    const sizes = nameMatch[1].trim().split(/[\s,-]+/).filter(Boolean);
    let quantities: number[] = [];

    if (quantitiesMatch && quantitiesMatch[1]) {
        quantities = quantitiesMatch[1].trim().split(/[\s-]+/).filter(Boolean).map(Number);
    }

    if (quantities.length === 0 || sizes.length !== quantities.length) {
        // Fallback for simple names like "S-M-L" or if parsing fails.
        return sizes.map(size => ({ size, quantity: 1 }));
    }

    return sizes.map((size, index) => ({
        size,
        quantity: quantities[index]
    }));
};


// --- SERIES SELECTION MODAL ---
const SeriesSelectionModal = ({ isOpen, onClose, productInfo, productVariant, onBulkAddToCart, t }) => {
    const [quantities, setQuantities] = useState({});

    useEffect(() => {
        if (isOpen) {
            setQuantities({});
        }
    }, [isOpen, productVariant]);

    const totalQuantity = useMemo(() => {
        return Object.values(quantities).reduce((sum, qty) => sum + (Number(qty) || 0), 0);
    }, [quantities]);

    if (!isOpen) return null;

    const handleQuantityChange = (seriesId, value) => {
        const series = productVariant.series.find((s) => s.id === seriesId);
        if (!series) return;

        const newQuantities = { ...quantities };
        const numValue = parseInt(value, 10);
    
        if (value === '') {
            newQuantities[seriesId] = '';
        } else if (!isNaN(numValue) && numValue >= 0) {
            newQuantities[seriesId] = String(Math.min(numValue, series.stock));
        }
        setQuantities(newQuantities);
    };

    const handleQuantityStep = (seriesId, step) => {
        const series = productVariant.series.find((s) => s.id === seriesId);
        if (!series) return;

        const currentQuantity = Number(quantities[seriesId] || 0);
        const newQuantity = Math.max(0, currentQuantity + step);
        
        setQuantities(prev => ({
            ...prev,
            [seriesId]: String(Math.min(newQuantity, series.stock))
        }));
    };

    const handleConfirmAddToCart = () => {
        const itemsToAdd = Object.entries(quantities)
            .map(([seriesId, quantity]) => {
                const numQuantity = Number(quantity);
                if (numQuantity > 0) {
                    const series = productVariant.series.find(s => s.id === seriesId);
                    if (series) {
                        return { 
                            product: productInfo,
                            variant: {
                                id: productVariant.id,
                                colorName: productVariant.colorName,
                                imageUrl: productVariant.imageUrl
                            },
                            series, 
                            quantity: numQuantity 
                        };
                    }
                }
                return null;
            })
            .filter(Boolean);

        if (itemsToAdd.length > 0) {
            onBulkAddToCart(itemsToAdd);
        }
        onClose();
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-container" onClick={(e) => e.stopPropagation()}>
                <header className="modal-header">
                    <div>
                        <h3>{productInfo.name}</h3>
                        <p>{`${productVariant.colorName} - ${productInfo.code}`}</p>
                    </div>
                    <button className="close-modal-btn" onClick={onClose} aria-label="Close modal">×</button>
                </header>
                <div className="modal-body">
                    <div className="modal-series-selector">
                        {productVariant.series.map((series) => {
                            const units = getUnitsPerSeries(series.name);
                            const unitPrice = units > 1 ? series.price / units : null;
                            const hasDiscount = typeof productInfo.discountPercentage === 'number' && productInfo.discountPercentage > 0;
                            const discountedPrice = hasDiscount ? series.price * (1 - (productInfo.discountPercentage / 100)) : series.price;
                            const discountedUnitPrice = (unitPrice && hasDiscount) ? unitPrice * (1 - (productInfo.discountPercentage / 100)) : unitPrice;

                            return (
                                <div key={series.id} className="series-item">
                                    <div className="series-info">
                                        <p>{series.name}</p>
                                        <div className="series-price">
                                            {hasDiscount && <span className="original-price">{formatCurrency(series.price, series.currency)}</span>}
                                            <span className={hasDiscount ? "discounted-price" : ""}>{formatCurrency(discountedPrice, series.currency)}</span>
                                        </div>
                                        {unitPrice !== null && (
                                            <p className="series-unit-price">
                                                (
                                                {hasDiscount ? 
                                                    <>
                                                        <span className="original-price">{formatCurrency(unitPrice, series.currency)}</span>
                                                        {' '}
                                                        <span>{formatCurrency(discountedUnitPrice, series.currency)}</span>
                                                    </>
                                                : 
                                                    <span>{formatCurrency(unitPrice, series.currency)}</span>
                                                }
                                                {` ${t.perPiece})`}
                                            </p>
                                        )}
                                    </div>
                                    <div className="add-to-cart-controls">
                                        {series.stock > 0 ? (
                                             <div className="quantity-stepper">
                                                <button onClick={() => handleQuantityStep(series.id, -1)} disabled={(Number(quantities[series.id]) || 0) <= 0}>-</button>
                                                <input
                                                    type="number"
                                                    min="0"
                                                    max={series.stock}
                                                    value={quantities[series.id] || ''}
                                                    placeholder="0"
                                                    onChange={(e) => handleQuantityChange(series.id, e.target.value)}
                                                    aria-label={`Quantity for ${series.name}`}
                                                />
                                                <button onClick={() => handleQuantityStep(series.id, 1)} disabled={(Number(quantities[series.id]) || 0) >= series.stock}>+</button>
                                            </div>
                                        ) : (
                                            <span className="out-of-stock-label">{t.outOfStock}</span>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <footer className="modal-footer">
                    <button className="btn-secondary" onClick={onClose}>{t.cancel}</button>
                    <button className="btn-primary" onClick={handleConfirmAddToCart} disabled={totalQuantity === 0}>
                        {t.confirmAddToCart}
                    </button>
                </footer>
            </div>
        </div>
    );
};
// --- PRODUCT CARD COMPONENT ---
const ProductCard = ({ product, onSelectOptions, t }) => {
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);

  if (!selectedVariant) {
    return (
        <div className="product-card">
            <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-code">{product.code}</p>
                <p>No variants available.</p>
            </div>
        </div>
    );
  }
  
  const isVariantOutOfStock = useMemo(() => {
    if (!selectedVariant) return true;
    return selectedVariant.series.reduce((sum, s) => sum + s.stock, 0) <= 0;
  }, [selectedVariant]);
  

  return (
    <div className="product-card">
      <div className="product-image-container">
        <img src={getTransformedImageUrl(selectedVariant.imageUrl, { width: 500, height: 500 })} alt={`${product.name} - ${selectedVariant.colorName}`} className="product-image" crossOrigin="anonymous" />
      </div>
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-code">{product.code}</p>
        <div className="color-selector">
          <div className="color-swatches">
            {product.variants.map(variant => (
              <div
                key={variant.id}
                className={`color-swatch ${selectedVariant.id === variant.id ? 'selected' : ''}`}
                style={{ backgroundColor: variant.colorCode }}
                onClick={() => setSelectedVariant(variant)}
                title={variant.colorName}
                aria-label={`Select color ${variant.colorName}`}
                role="button"
                tabIndex={0}
              />
            ))}
          </div>
        </div>
        <div className="product-actions">
           <button 
                className="select-options-btn" 
                onClick={() => onSelectOptions(product, selectedVariant)}
                disabled={isVariantOutOfStock}
            >
                {isVariantOutOfStock ? t.outOfStock : t.selectOptions}
           </button>
        </div>
      </div>
    </div>
  );
};

// --- CART COMPONENT ---
const CartSidebar = ({ isOpen, onClose, cartItems, onRemoveItem, onUpdateQuantity, onShareOrder, isSharing, cartStats, t, onDownloadExcel, isDownloadingExcel }) => {
    const totals = useMemo(() => {
        // FIX: Provide a type for the accumulator to avoid errors on `acc[currency]`.
        return cartItems.reduce((acc: { [key: string]: number }, item: any) => {
            const { currency, price } = item.series;
            const discount = item.discountPercentage || 0;
            const discountedPrice = price * (1 - (discount / 100));
            const quantity = Number(item.quantity || 0);
            if (!acc[currency]) {
                acc[currency] = 0;
            }
            acc[currency] += discountedPrice * quantity;
            return acc;
        }, {});
    }, [cartItems]);

    return (
        <>
          <div className={`cart-overlay ${isOpen ? 'open' : ''}`} onClick={onClose}></div>
          <aside className={`cart-sidebar ${isOpen ? 'open' : ''}`} role="dialog" aria-modal="true" aria-labelledby="cart-heading">
            <header className="cart-header">
              <h2 id="cart-heading">{t.shoppingCart}</h2>
              <button className="close-cart-btn" onClick={onClose} aria-label="Close cart">×</button>
            </header>
            <div className="cart-body">
              {cartItems.length === 0 ? (
                <p className="cart-empty-message">{t.emptyCart}</p>
              ) : (
                cartItems.map((item, index) => {
                    const hasDiscount = typeof item.discountPercentage === 'number' && item.discountPercentage > 0;
                    const seriesPrice = item.series.price;
                    const discountedSeriesPrice = hasDiscount ? seriesPrice * (1 - (item.discountPercentage / 100)) : seriesPrice;

                    const units = getUnitsPerSeries(item.series.name);
                    const unitPrice = units > 1 ? seriesPrice / units : null;
                    const discountedUnitPrice = (unitPrice && hasDiscount) ? unitPrice * (1 - (item.discountPercentage / 100)) : unitPrice;

                    return (
                        <div key={`${item.series.id}-${index}`} className="cart-item">
                            <img src={getTransformedImageUrl(item.variant.imageUrl, { width: 160, height: 220 })} alt={item.variant.colorName} className="cart-item-img" crossOrigin="anonymous" />
                            <div className="cart-item-details">
                                <div className="cart-item-description">
                                    <p>
                                        {item.productName}
                                        {hasDiscount && <span className="discount-tag" style={{ marginLeft: '8px' }}>%{item.discountPercentage}</span>}
                                    </p>
                                    <p>{item.productCode}</p>
                                    <p>{item.variant.colorName}</p>
                                    <p>{item.series.name}</p>
                                    {unitPrice !== null && (
                                        <p className="cart-item-unit-price">
                                            (
                                            {hasDiscount ?
                                            <>
                                                <span className="original-price">{formatCurrency(unitPrice, item.series.currency)}</span>
                                                {" "}
                                                <span>{formatCurrency(discountedUnitPrice, item.series.currency)}</span>
                                            </> :
                                            <span>{formatCurrency(unitPrice, item.series.currency)}</span>
                                            }
                                            {` ${t.perPiece})`}
                                        </p>
                                    )}
                                </div>
                                <div className="cart-item-actions">
                                    <div className="cart-item-quantity-editor">
                                    <button onClick={() => onUpdateQuantity(item.series.id, Number(item.quantity || 0) - 1)} aria-label="Decrease quantity"><MinusIcon /></button>
                                    <input
                                        type="number"
                                        value={item.quantity}
                                        onChange={(e) => {
                                            const val = Number.parseInt(e.target.value, 10);
                                            if (!isNaN(val)) onUpdateQuantity(item.series.id, val);
                                        }}
                                        aria-label="Item quantity"
                                    />
                                    <button onClick={() => onUpdateQuantity(item.series.id, Number(item.quantity || 0) + 1)} aria-label="Increase quantity"><PlusIcon /></button>
                                    </div>
                                    <div className="cart-item-line-total">
                                        {hasDiscount && <span
                                            className="original-price"
                                            style={{ display: 'block', fontSize: '0.8em', fontWeight: '400' }}
                                        >{formatCurrency(Number(item.quantity || 0) * seriesPrice, item.series.currency)}</span>}
                                        {formatCurrency(Number(item.quantity || 0) * discountedSeriesPrice, item.series.currency)}
                                    </div>
                                    <button className="remove-item-btn" onClick={() => onRemoveItem(item.series.id)} aria-label="Remove item">
                                    <Trash2Icon />
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })
              )}
            </div>
            {cartItems.length > 0 && (
              <footer className="cart-footer">
                <div className="cart-stats-summary">
                   <div className="stat-row">
                       <span>{t.itemTypes}</span>
                       <span>{cartStats.totalItemTypes}</span>
                   </div>
                   <div className="stat-row">
                       <span>{t.totalPacks}</span>
                       <span>{cartStats.totalPacks}</span>
                   </div>
                   <div className="stat-row">
                       <span>{t.totalUnits}</span>
                       <span>{cartStats.totalUnits}</span>
                   </div>
                </div>
                <div className="totals-summary">
                   {Object.entries(totals).map(([currency, total]) => (
                     <div key={currency} className="total-row">
                        <span>{`${t.total} (${currency})`}</span>
                        <span>{formatCurrency(total as number, currency)}</span>
                     </div>
                   ))}
                </div>
                <button className="share-order-btn" onClick={onShareOrder} disabled={isSharing || isDownloadingExcel}>
                    {isSharing ? t.sharingOrder : t.shareOrder}
                </button>
                 <button 
                    className="download-excel-btn" 
                    onClick={onDownloadExcel} 
                    disabled={isDownloadingExcel || isSharing} 
                >
                    {isDownloadingExcel ? t.downloading : (
                        <> 
                            <DownloadIcon />
                            {t.downloadExcel}
                        </>
                    )}
                </button>
              </footer>
            )}
          </aside>
        </>
    );
};


// --- ORDER SHARE IMAGE COMPONENT ---
// FIX: Type props as any to allow passing them to the component.
const OrderShareImage = forwardRef(({ cartItems, totals, t, storeSettings, cartStats }: any, ref) => {
    return (
        <div id="order-share-container" ref={ref as React.RefObject<HTMLDivElement>}>
            <div className="order-share-header">
                <div className="order-share-store-info">
                   {storeSettings.logo && <img src={storeSettings.logo} alt="Store Logo" className="order-share-logo" crossOrigin="anonymous" />}
                   <h2>{storeSettings.name}</h2>
                </div>
                <p>{new Date().toLocaleString()}</p>
            </div>
            <div className="order-share-body">
                {cartItems.map((item: any, index: number) => {
                    const hasDiscount = typeof item.discountPercentage === 'number' && item.discountPercentage > 0;
                    const seriesPrice = item.series.price;
                    const discountedSeriesPrice = hasDiscount ? seriesPrice * (1 - (item.discountPercentage / 100)) : seriesPrice;

                    const units = getUnitsPerSeries(item.series.name);
                    const unitPrice = units > 1 ? seriesPrice / units : null;
                    const discountedUnitPrice = (unitPrice && hasDiscount) ? unitPrice * (1 - (item.discountPercentage / 100)) : unitPrice;

                    return (
                        <div key={`${item.series.id}-${index}`} className="order-share-item">
                            <img src={getTransformedImageUrl(item.variant.imageUrl, { width: 120, height: 120 })} alt={item.variant.colorName} className="order-share-img" crossOrigin="anonymous" />
                            <div className="order-share-details">
                                <p className="order-share-pname">
                                    {item.productName} <span className="order-share-pcode">{`(${item.productCode})`}</span>
                                    {hasDiscount && <span className="discount-tag" style={{ marginLeft: '8px', fontSize: '0.7rem'}}>%{item.discountPercentage}</span>}
                                </p>
                                <p className="order-share-pseries">
                                    {`${item.variant.colorName} - ${item.series.name}`}
                                    {unitPrice !== null && (
                                        <span className="order-share-unit-price">
                                            {" ("}
                                            {hasDiscount ?
                                            <>
                                                <span className="original-price">{formatCurrency(unitPrice, item.series.currency)}</span>
                                                {" / "}
                                                <span>{formatCurrency(discountedUnitPrice, item.series.currency)}</span>
                                            </> :
                                            formatCurrency(unitPrice, item.series.currency)
                                            }
                                            {`${t.perPiece})`}
                                        </span>
                                    )}
                                </p>
                            </div>
                            <div className="order-share-pricing">
                                <p className="price">
                                    {hasDiscount && <span className="original-price" style={{ display: 'block', fontSize: '0.8em', fontWeight: '400' }}>{formatCurrency(Number(item.quantity || 0) * seriesPrice, item.series.currency)}</span>}
                                    {formatCurrency(Number(item.quantity || 0) * discountedSeriesPrice, item.series.currency)}
                                </p>
                                <p className="qty">{`Qty: ${item.quantity}`}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className="order-share-stats">
                <div className="order-share-stat-item">
                    <span>{cartStats.totalItemTypes}</span>
                    <label>{t.itemTypes}</label>
                </div>
                <div className="order-share-stat-item">
                    <span>{cartStats.totalPacks}</span>
                    <label>{t.totalPacks}</label>
                </div>
                <div className="order-share-stat-item">
                    <span>{cartStats.totalUnits}</span>
                    <label>{t.totalUnits}</label>
                </div>
            </div>
            <div className="order-share-footer">
                {Object.entries(totals).map(([currency, total]) => (
                    <div key={currency} className="order-share-total-row">
                        <span>{`${t.total} (${currency})`}</span>
                        <span>{formatCurrency(total as number, currency)}</span>
                    </div>
                ))}
            </div>
        </div>
    );
});


// --- AUTHENTICATION MODAL ---
const AuthModal = ({ isOpen, onClose, t }) => {
    const [view, setView] = useState('chooser'); // 'chooser', 'login', 'signup'
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [storeName, setStoreName] = useState('');
    const [subdomain, setSubdomain] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (isOpen) {
            setView('chooser');
            setEmail('');
            setPassword('');
            setStoreName('');
            setSubdomain('');
            setError('');
            setLoading(false);
        }
    }, [isOpen]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        const { error } = await db.auth.signInWithPassword({ email, password });
        if (error) {
            setError(error.message);
        } else {
            onClose(); // onAuthStateChange will handle the rest
        }
        setLoading(false);
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        if (!storeName || !subdomain || !email || !password) {
            setError("Please fill all fields.");
            return;
        }
        setLoading(true);
        setError('');

        try {
            const { data: existingStore } = await db.from('stores').select('id').eq('subdomain', subdomain).single();
            if (existingStore) {
                throw new Error('This store URL is already taken.');
            }

            const { data: authData, error: signUpError } = await db.auth.signUp({ email, password });
            if (signUpError) throw signUpError;

            if (authData.user) {
                const { error: storeError } = await db.from('stores').insert({
                    owner_id: authData.user.id,
                    name: storeName,
                    subdomain: subdomain,
                    name_color: '#192A56',
                });
                if (storeError) throw storeError;
                // Log in the new user automatically
                await db.auth.signInWithPassword({ email, password });
                onClose();
            } else {
                throw new Error("Could not create user.");
            }
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };
    
    const handleSubdomainChange = (e) => {
        const value = e.target.value;
        const sanitized = value.toLowerCase().replace(/[^a-z0-9-]/g, '');
        setSubdomain(sanitized);
    };


    if (!isOpen) return null;

    const renderChooser = () => (
        <div style={{display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center'}}>
            <button className="btn-primary" style={{width: '100%'}} onClick={() => setView('login')}>{t.login}</button>
            <span style={{color: 'var(--secondary-color)', fontWeight: 500}}>{t.or}</span>
            <button className="btn-secondary" style={{width: '100%'}} onClick={() => setView('signup')}>{t.createAccount}</button>
        </div>
    );

    const renderLogin = () => (
        <form onSubmit={handleLogin}>
            <h3 style={{textAlign: 'center', marginBottom: '24px'}}>{t.loginToYourAccount}</h3>
            <div className="form-group">
                <label htmlFor="login-email">{t.emailAddress}</label>
                <input id="login-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoFocus />
            </div>
            <div className="form-group">
                <label htmlFor="login-password">{t.password}</label>
                <input id="login-password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <button type="submit" className="btn-primary" style={{width:'100%'}} disabled={loading}>{loading ? `${t.login}...` : t.login}</button>
            <p style={{textAlign: 'center', marginTop: '16px', fontSize: '0.9rem'}}>
                {t.signupPrompt} <button type="button" className="btn-link-style" onClick={() => setView('signup')}>{t.createAccount}</button>
            </p>
        </form>
    );

    const renderSignup = () => (
        <form onSubmit={handleSignUp}>
            <h3 style={{textAlign: 'center', marginBottom: '24px'}}>{t.createNewStore}</h3>
             <div className="form-group">
                <label htmlFor="signup-storename">{t.storeNameLabel}</label>
                <input id="signup-storename" type="text" value={storeName} onChange={(e) => setStoreName(e.target.value)} required autoFocus />
            </div>
             <div className="form-group">
                <label htmlFor="signup-subdomain">{t.storeUrl}</label>
                <input id="signup-subdomain" type="text" value={subdomain} onChange={handleSubdomainChange} required />
                <p style={{fontSize: '0.8rem', color: 'var(--secondary-color)', marginTop: '4px'}}>{t.subdomainHelp}</p>
            </div>
            <div className="form-group">
                <label htmlFor="signup-email">{t.emailAddress}</label>
                <input id="signup-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="form-group">
                <label htmlFor="signup-password">{t.password}</label>
                <input id="signup-password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} />
            </div>
            <button type="submit" className="btn-primary" style={{width:'100%'}} disabled={loading}>{loading ? `${t.createAccount}...` : t.createAccount}</button>
            <p style={{textAlign: 'center', marginTop: '16px', fontSize: '0.9rem'}}>
                {t.loginPrompt} <button type="button" className="btn-link-style" onClick={() => setView('login')}>{t.login}</button>
            </p>
        </form>
    );

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-container password-modal" onClick={(e) => e.stopPropagation()}>
                <header className="modal-header">
                    <h3>{t.authHeader}</h3>
                    <button className="close-modal-btn" onClick={onClose} aria-label={t.close}>×</button>
                </header>
                <div className="modal-body">
                    {error && <p className="password-error">{error}</p>}
                    {view === 'chooser' && renderChooser()}
                    {view === 'login' && renderLogin()}
                    {view === 'signup' && renderSignup()}
                </div>
            </div>
        </div>
    );
};

// --- ADMIN PANEL COMPONENTS ---
const CollarTypeForm = ({ type: initialType, onSave, onCancel, t }) => {
    const [type, setType] = useState(initialType);

    return (
        <div className="template-edit-form">
            <h2>{type.id.startsWith('new_') ? t.addNewCollarType : t.editCollarType}</h2>
            <div className="form-group">
                <label>{t.collarTypeName}</label>
                <input type="text" value={type.name} onChange={(e) => setType({ ...type, name: e.target.value })} autoFocus />
            </div>
            <div className="form-actions">
                <button className="btn-primary" onClick={() => onSave(type)}>{t.saveChanges}</button>
                <button className="btn-secondary" onClick={onCancel}>{t.cancel}</button>
            </div>
        </div>
    );
};

const CollarTypesManager = ({ collarTypes, onFetchData, t }) => {
    const [editingType, setEditingType] = useState(null);

    const handleSave = async (typeToSave) => {
        const { error } = await db.from('collar_types').upsert({
            id: typeToSave.id.startsWith('new_') ? undefined : typeToSave.id,
            name: typeToSave.name,
        });

        if (error) {
            console.error("Error saving collar type:", error);
            alert(`Failed to save collar type: ${error.message}`);
        } else {
            onFetchData();
            setEditingType(null);
        }
    };

    const handleDelete = async (typeId) => {
        if (window.confirm(t.deleteConfirm)) {
            const { error } = await db.from('collar_types').delete().eq('id', typeId);
            if (error) {
                console.error("Error deleting collar type:", error);
                alert(`Failed to delete collar type: ${error.message}`);
            } else {
                onFetchData();
            }
        }
    };

    const handleAddNew = () => {
        setEditingType({ id: `new_${generateId()}`, name: '' });
    };

    if (editingType) {
        return <CollarTypeForm type={editingType} onSave={handleSave} onCancel={() => setEditingType(null)} t={t} />;
    }

    return (
        <div>
            <div className="admin-header">
                <h2>{t.collarTypes}</h2>
                <button className="btn-primary" onClick={handleAddNew}>+ {t.addNewCollarType}</button>
            </div>
            <div className="template-list">
                {collarTypes.map((type) => (
                    <div key={type.id} className="template-item">
                        <div className="template-info">
                            <h4>{t[getTranslationKey(type.name)] || type.name}</h4>
                        </div>
                        <div className="template-actions">
                            <button className="btn-secondary" onClick={() => setEditingType(type)}>{t.edit}</button>
                            <button className="btn-danger" onClick={() => handleDelete(type.id)}>{t.delete}</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const ContentTemplateForm = ({ template: initialTemplate, onSave, onCancel, t }) => {
    const [template, setTemplate] = useState(initialTemplate);

    return (
        <div className="template-edit-form">
            <h2>{template.id.startsWith('new_') ? t.addNewContentTemplate : t.editContentTemplate}</h2>
            <div className="form-group">
                <label>{t.contentTemplateName}</label>
                <input type="text" value={template.name} onChange={(e) => setTemplate({ ...template, name: e.target.value })} autoFocus />
            </div>
            <div className="form-actions">
                <button className="btn-primary" onClick={() => onSave(template)}>{t.saveChanges}</button>
                <button className="btn-secondary" onClick={onCancel}>{t.cancel}</button>
            </div>
        </div>
    );
};

const ContentManager = ({ contentTemplates, onFetchData, t }) => {
    const [editingTemplate, setEditingTemplate] = useState(null);

    const handleSave = async (templateToSave) => {
        const { error } = await db.from('content_templates').upsert({
            id: templateToSave.id.startsWith('new_') ? undefined : templateToSave.id,
            name: templateToSave.name,
        });

        if (error) {
            console.error("Error saving content template:", error);
            alert(`Failed to save content template: ${error.message}`);
        } else {
            onFetchData();
            setEditingTemplate(null);
        }
    };

    const handleDelete = async (templateId) => {
        if (window.confirm(t.deleteConfirm)) {
            const { error } = await db.from('content_templates').delete().eq('id', templateId);
            if (error) {
                console.error("Error deleting content template:", error);
                alert(`Failed to delete content template: ${error.message}`);
            } else {
                onFetchData();
            }
        }
    };

    const handleAddNew = () => {
        setEditingTemplate({ id: `new_${generateId()}`, name: '' });
    };

    if (editingTemplate) {
        return <ContentTemplateForm template={editingTemplate} onSave={handleSave} onCancel={() => setEditingTemplate(null)} t={t} />;
    }

    return (
        <div>
            <div className="admin-header">
                <h2>{t.contentTemplates}</h2>
                <button className="btn-primary" onClick={handleAddNew}>+ {t.addNewContentTemplate}</button>
            </div>
            <div className="template-list">
                {contentTemplates.map((template) => (
                    <div key={template.id} className="template-item">
                        <div className="template-info">
                            <h4>{template.name}</h4>
                        </div>
                        <div className="template-actions">
                            <button className="btn-secondary" onClick={() => setEditingTemplate(template)}>{t.edit}</button>
                            <button className="btn-danger" onClick={() => handleDelete(template.id)}>{t.delete}</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const GenderTemplateForm = ({ template: initialTemplate, onSave, onCancel, t }) => {
    const [template, setTemplate] = useState(initialTemplate);

    return (
        <div className="template-edit-form">
            <h2>{template.id.startsWith('new_') ? t.addNewGenderTemplate : t.editGenderTemplate}</h2>
            <div className="form-group">
                <label>{t.genderTemplateName}</label>
                <input type="text" value={template.name} onChange={(e) => setTemplate({ ...template, name: e.target.value })} autoFocus />
            </div>
            <div className="form-actions">
                <button className="btn-primary" onClick={() => onSave(template)}>{t.saveChanges}</button>
                <button className="btn-secondary" onClick={onCancel}>{t.cancel}</button>
            </div>
        </div>
    );
};

const GenderManager = ({ genderTemplates, onFetchData, t }) => {
    const [editingTemplate, setEditingTemplate] = useState(null);

    const handleSave = async (templateToSave) => {
        const { error } = await db.from('gender_templates').upsert({
            id: templateToSave.id.startsWith('new_') ? undefined : templateToSave.id,
            name: templateToSave.name,
        });

        if (error) {
            console.error("Error saving gender template:", error);
            alert(`Failed to save gender template: ${error.message}`);
        } else {
            onFetchData();
            setEditingTemplate(null);
        }
    };

    const handleDelete = async (templateId) => {
        if (window.confirm(t.deleteConfirm)) {
            const { error } = await db.from('gender_templates').delete().eq('id', templateId);
            if (error) {
                console.error("Error deleting gender template:", error);
                alert(`Failed to delete gender template: ${error.message}`);
            } else {
                onFetchData();
            }
        }
    };

    const handleAddNew = () => {
        setEditingTemplate({ id: `new_${generateId()}`, name: '' });
    };

    if (editingTemplate) {
        return <GenderTemplateForm template={editingTemplate} onSave={handleSave} onCancel={() => setEditingTemplate(null)} t={t} />;
    }

    return (
        <div>
            <div className="admin-header">
                <h2>{t.genderTemplates}</h2>
                <button className="btn-primary" onClick={handleAddNew}>+ {t.addNewGenderTemplate}</button>
            </div>
            <div className="template-list">
                {genderTemplates.map((template) => (
                    <div key={template.id} className="template-item">
                        <div className="template-info">
                            <h4>{t[template.name.toLowerCase()] || template.name}</h4>
                        </div>
                        <div className="template-actions">
                            <button className="btn-secondary" onClick={() => setEditingTemplate(template)}>{t.edit}</button>
                            <button className="btn-danger" onClick={() => handleDelete(template.id)}>{t.delete}</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};


const ProductForm = ({ product: initialProduct, seriesTemplates, collarTypes, contentTemplates, genderTemplates, onSave, onCancel, t, storeId }) => {
    const [product, setProduct] = useState(JSON.parse(JSON.stringify(initialProduct)));
    const [uploadingVideo, setUploadingVideo] = useState({ active: false, type: null, index: null });
    const [openTemplateDropdown, setOpenTemplateDropdown] = useState(null);
    const [quickStockValues, setQuickStockValues] = useState({});
    const [editingUnitPrice, setEditingUnitPrice] = useState<{key: string, value: string} | null>(null);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpenTemplateDropdown(null);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropdownRef]);

    const handleQuickStockValueChange = (variantId, value) => {
        setQuickStockValues(prev => ({ ...prev, [variantId]: value }));
    };

    const handleBulkStockUpdate = (variantIndex, stockValue) => {
        const newStock = parseInt(stockValue, 10);
        if (isNaN(newStock) || newStock < 0) {
            alert("Please enter a valid non-negative number for stock.");
            return;
        }

        const newVariants = [...product.variants];
        const targetVariant = { ...newVariants[variantIndex] };
        targetVariant.series = targetVariant.series.map((s) => ({ ...s, stock: newStock }));
        newVariants[variantIndex] = targetVariant;
        setProduct((p) => ({ ...p, variants: newVariants }));
    };

    const handleChange = (field, value) => {
        setProduct((p) => ({ ...p, [field]: value }));
    };

    const handleVariantChange = (variantIndex, field, value) => {
        const newVariants = [...product.variants];
        const newVariant = { ...newVariants[variantIndex], [field]: value };

        if (field === 'colorName') {
            const normalizedColorName = value.toLowerCase().trim();
            const hexCode = colorNameMap[normalizedColorName];
            if (hexCode) {
                newVariant.colorCode = hexCode;
            }
        }
    
        newVariants[variantIndex] = newVariant;
        setProduct((p) => ({ ...p, variants: newVariants }));
    };

    const handleSeriesChange = (variantIndex, seriesIndex, field, value) => {
        const newVariants = [...product.variants];
        const newSeries = [...newVariants[variantIndex].series];
        const seriesItem = { ...newSeries[seriesIndex] };

        // Maintain a hidden unit price in the state or calculate on the fly
        let unitPrice = seriesItem._unitPrice || 0;
        if (unitPrice === 0 && seriesItem.price > 0) {
            const units = getUnitsPerSeries(seriesItem.name);
            if (units > 0) {
                unitPrice = seriesItem.price / units;
            }
        }

        switch(field) {
            case 'unitPrice': {
                unitPrice = parseFloat(String(value)) || 0;
                seriesItem._unitPrice = unitPrice;
                const units = getUnitsPerSeries(seriesItem.name);
                seriesItem.price = parseFloat((unitPrice * units).toFixed(2));
                break;
            }
            case 'stock':
                seriesItem.stock = Number.parseInt(String(value), 10) || 0;
                break;
            case 'name': {
                seriesItem.name = value;
                const newUnits = getUnitsPerSeries(seriesItem.name);
                seriesItem.price = parseFloat((unitPrice * newUnits).toFixed(2));
                break;
            }
            case 'currency':
                seriesItem.currency = value;
                break;
        }

        newSeries[seriesIndex] = seriesItem;
        newVariants[variantIndex].series = newSeries;
        setProduct((p) => ({ ...p, variants: newVariants }));
    };

    const addVariant = () => {
        const newVariant = { id: generateId(), colorName: '', colorCode: '#ffffff', imageUrl: '', video_url: '', series: [] };
        setProduct((p) => ({ ...p, variants: [...p.variants, newVariant] }));
    };

    const removeVariant = (variantIndex) => {
        const newVariants = product.variants.filter((_, i) => i !== variantIndex);
        setProduct((p) => ({ ...p, variants: newVariants }));
    };

    const addSeries = (variantIndex) => {
        const newSeriesItem = { id: generateId(), name: '', price: 0, currency: 'USD', stock: 0 };
        const newVariants = [...product.variants];
        newVariants[variantIndex].series.push(newSeriesItem);
        setProduct((p) => ({ ...p, variants: newVariants }));
    };

    const removeSeries = (variantIndex, seriesIndex) => {
        const newVariants = [...product.variants];
        newVariants[variantIndex].series = newVariants[variantIndex].series.filter((_, i) => i !== seriesIndex);
        setProduct((p) => ({ ...p, variants: newVariants }));
    };
    
    const duplicateVariant = (variantIndex) => {
        const sourceVariant = product.variants[variantIndex];
        
        const newVariant = JSON.parse(JSON.stringify(sourceVariant));

        newVariant.id = generateId();
        newVariant.colorName = '';
        newVariant.colorCode = '#ffffff';
        newVariant.imageUrl = '';
        newVariant.video_url = '';
        
        newVariant.series = newVariant.series.map((series) => ({
            ...series,
            id: generateId()
        }));

        const newVariants = [...product.variants];
        newVariants.splice(variantIndex + 1, 0, newVariant);

        setProduct((p) => ({ ...p, variants: newVariants }));
    };

    const handleTemplateSelect = (variantIndex, templateId) => {
        const template = seriesTemplates.find((t) => t.id === templateId);
        if (!template) return;

        const newSeriesFromTemplate = template.seriesNames.map((name) => ({
            id: generateId(),
            name,
            price: 0,
            currency: 'USD',
            stock: 1,
        }));
        
        const newVariants = [...product.variants];
        newVariants[variantIndex].series = [...newVariants[variantIndex].series, ...newSeriesFromTemplate];
        setProduct((p) => ({ ...p, variants: newVariants }));
        setOpenTemplateDropdown(null);
    };


    const handleImageUpload = async (e, variantIndex) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const filePath = `${storeId}/${Date.now()}-${file.name}`;
        const { error } = await db.storage.from('product-images').upload(filePath, file);
        
        if (error) {
            console.error('Error uploading image:', error);
            alert(`Image upload failed: ${error.message}`);
            return;
        }

        const { data } = db.storage.from('product-images').getPublicUrl(filePath);
        if (data.publicUrl) {
            handleVariantChange(variantIndex, 'imageUrl', data.publicUrl);
        }
    };

    const handleVideoUpload = async (e, variantIndex = null) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploadingVideo({ active: true, type: variantIndex === null ? 'main' : 'variant', index: variantIndex });

        const filePath = `public/${storeId}/${Date.now()}-${file.name.replace(/\s/g, '_')}`;
        const { error } = await db.storage.from('product-videos').upload(filePath, file);

        if (error) {
            console.error('Error uploading video:', error);
            alert(`Video upload failed: ${error.message}`);
            setUploadingVideo({ active: false, type: null, index: null });
            return;
        }

        const { data } = db.storage.from('product-videos').getPublicUrl(filePath);
        if (data.publicUrl) {
            if (variantIndex !== null) {
                handleVariantChange(variantIndex, 'video_url', data.publicUrl);
            } else {
                handleChange('video_url', data.publicUrl);
            }
        }
        setUploadingVideo({ active: false, type: null, index: null });
    };

    return (
        <div className="admin-edit-form">
            <h2>{product.id.startsWith('new_') ? t.addNewProduct : t.editProduct}</h2>
            <div className="form-section">
                <div className="form-group">
                    <label>{t.productName}</label>
                    <input type="text" value={product.name} onChange={(e) => handleChange('name', e.target.value)} />
                </div>
                <div className="form-grid">
                    <div className="form-group">
                        <label>{t.productCode}</label>
                        <input type="text" value={product.code} onChange={(e) => handleChange('code', e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>Discount Percentage (%)</label>
                        <input 
                            type="number" 
                            min="0" 
                            max="100" 
                            placeholder="e.g. 20" 
                            value={product.discountPercentage || ''} 
                            onChange={(e) => handleChange('discountPercentage', parseInt(e.target.value, 10) || 0)} 
                        />
                    </div>
                </div>
                 <div className="form-group">
                    <label>Video (Optional)</label>
                    {product.video_url && <video key={product.video_url} src={product.video_url} controls muted playsInline style={{ maxWidth: '200px', maxHeight: '150px', marginBottom: '10px', display: 'block', borderRadius: 'var(--border-radius)' }} />}
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center'}}>
                      <input
                        type="url"
                        value={product.video_url || ''}
                        onChange={(e) => handleChange('video_url', e.target.value)}
                        placeholder="https://... or upload"
                        style={{ flexGrow: 1 }}
                      />
                      <input
                          type="file"
                          id='mainVideoUpload'
                          style={{ display: 'none' }}
                          accept="video/*"
                          onChange={(e) => handleVideoUpload(e)}
                      />
                      <label htmlFor='mainVideoUpload' className="btn-secondary">
                          {uploadingVideo.active && uploadingVideo.type === 'main' ? t.uploadingVideo : t.uploadFromDevice}
                      </label>
                    </div>
                </div>
                <div className="form-grid">
                    <div className="form-group">
                        <label>{t.season}</label>
                        <select value={product.season || ''} onChange={(e) => handleChange('season', e.target.value)}>
                            <option value="">{t.select}</option>
                            <option value="Summer">{t.summer}</option>
                            <option value="Winter">{t.winter}</option>
                            <option value="All Season">{t.allSeason}</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>{t.collarType}</label>
                        <select value={product.collarType || ''} onChange={(e) => handleChange('collarType', e.target.value)}>
                            <option value="">{t.select}</option>
                            {collarTypes.map((ct) => (
                                <option key={ct.id} value={ct.name}>{t[getTranslationKey(ct.name)] || ct.name}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="form-grid">
                    <div className="form-group">
                        <label>{t.contentPercentage}</label>
                        <select value={product.content || ''} onChange={(e) => handleChange('content', e.target.value)}>
                            <option value="">{t.select}</option>
                            {contentTemplates.map((ct) => (
                                <option key={ct.id} value={ct.name}>{ct.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>{t.gender}</label>
                        <select value={product.gender || ''} onChange={(e) => handleChange('gender', e.target.value)}>
                            <option value="">{t.select}</option>
                            {genderTemplates.map((gt) => (
                                <option key={gt.id} value={gt.name}>{t[gt.name.toLowerCase()] || gt.name}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            <h3>{t.variants}</h3>
            {product.variants.map((variant, vIdx) => {
                const variantId = variant.id || vIdx;
                const currentQuickStockValue = quickStockValues[variantId] || '';
                return (
                    <div key={variantId} className="variant-section">
                        <div className="variant-header">
                            <h4>{`${t.colorName}: ${variant.colorName || `(${t.new})`}`}</h4>
                            <div className="variant-header-actions">
                                <button className="btn-icon" onClick={() => duplicateVariant(vIdx)} title={t.duplicateVariant}>
                                    <CopyIcon />
                                </button>
                                <button className="btn-remove-nested" onClick={() => removeVariant(vIdx)}>{t.removeVariant}</button>
                            </div>
                        </div>
                        <div className="form-grid">
                            <div className="form-group">
                                <label>{t.colorName}</label>
                                <input type="text" value={variant.colorName} onChange={(e) => handleVariantChange(vIdx, 'colorName', e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label>{t.colorCode}</label>
                                <input type="color" className="color-input" value={variant.colorCode} onChange={(e) => handleVariantChange(vIdx, 'colorCode', e.target.value)} />
                            </div>
                        </div>
                         <div className="form-group">
                            <label>{t.productImage}</label>
                            <div className="image-upload-container">
                                {variant.imageUrl && <img src={getTransformedImageUrl(variant.imageUrl, { width: 160, height: 160 })} alt="Preview" className="image-preview" />}
                                <input
                                    type="file"
                                    id={`imageUpload_${variant.id}`}
                                    style={{ display: 'none' }}
                                    accept="image/*"
                                    onChange={(e) => handleImageUpload(e, vIdx)}
                                />
                                <label htmlFor={`imageUpload_${variant.id}`} className="btn-secondary">
                                    {t.uploadImage}
                                </label>
                            </div>
                        </div>
                        <div className="form-group">
                            <label>{t.videoUrlVariant}</label>
                            {variant.video_url && <video key={variant.video_url} src={variant.video_url} controls muted playsInline style={{ maxWidth: '200px', maxHeight: '150px', marginBottom: '10px', display: 'block', borderRadius: 'var(--border-radius)' }} />}
                            <div style={{ display: 'flex', gap: '10px', alignItems: 'center'}}>
                              <input
                                  type="url"
                                  value={variant.video_url || ''}
                                  onChange={(e) => handleVariantChange(vIdx, 'video_url', e.target.value)}
                                  placeholder="https://... or upload"
                                  style={{ flexGrow: 1 }}
                              />
                              <input
                                  type="file"
                                  id={`variantVideoUpload_${variant.id}`}
                                  style={{ display: 'none' }}
                                  accept="video/*"
                                  onChange={(e) => handleVideoUpload(e, vIdx)}
                              />
                              <label htmlFor={`variantVideoUpload_${variant.id}`} className="btn-secondary">
                                  {uploadingVideo.active && uploadingVideo.type === 'variant' && uploadingVideo.index === vIdx ? t.uploadingVideo : t.uploadFromDevice}
                              </label>
                            </div>
                        </div>
                        
                        <h5>{t.series_packs}</h5>

                        <div className="quick-stock-controls">
                            <label htmlFor={`quick-stock-${variantId}`}>{t.quickStockUpdate}</label>
                            <div className="quick-stock-input-group">
                                <input
                                    id={`quick-stock-${variantId}`}
                                    type="number"
                                    placeholder="Qty"
                                    value={currentQuickStockValue}
                                    onChange={(e) => handleQuickStockValueChange(String(variantId), e.target.value)}
                                />
                                <button type="button" className="btn-secondary" onClick={() => handleBulkStockUpdate(vIdx, currentQuickStockValue)}>{t.set}</button>
                                <button type="button" className="btn-secondary" onClick={() => handleBulkStockUpdate(vIdx, '0')}>{t.setToZero}</button>
                            </div>
                        </div>

                        <div className="custom-dropdown-container" ref={openTemplateDropdown === vIdx ? dropdownRef : null}>
                            <button type="button" className="btn-secondary dropdown-toggle-btn" onClick={() => setOpenTemplateDropdown(openTemplateDropdown === vIdx ? null : vIdx)}>
                                <span>{t.applyTemplate}</span>
                                <span className="dropdown-arrow">▼</span>
                            </button>
                            {openTemplateDropdown === vIdx && (
                                <ul className="dropdown-menu">
                                    {seriesTemplates.length > 0
                                        ? seriesTemplates.map((template) => (
                                            <li key={template.id} onClick={() => handleTemplateSelect(vIdx, template.id)}>
                                                {template.name}
                                            </li>
                                        ))
                                        : <li className="dropdown-menu-empty">No templates available</li>
                                    }
                                </ul>
                            )}
                        </div>

                        <div className="series-list">
                            {variant.series.map((series, sIdx) => {
                                const units = getUnitsPerSeries(series.name);
                                const unitPrice = (series.price > 0 && units > 0) ? (series.price / units) : (series._unitPrice || 0);
                                const seriesKey = `${vIdx}-${sIdx}`;
                                const isEditingThis = editingUnitPrice?.key === seriesKey;
                                return (
                                    <div key={series.id || sIdx} className="series-item-form">
                                        <input type="text" placeholder={t.seriesName} value={series.name} onChange={(e) => handleSeriesChange(vIdx, sIdx, 'name', e.target.value)} />
                                        <input
                                            type="text"
                                            inputMode="decimal"
                                            placeholder={t.unitPrice}
                                            value={isEditingThis ? editingUnitPrice.value : (unitPrice > 0 ? String(unitPrice.toFixed(2)) : '')}
                                            onFocus={() => setEditingUnitPrice({ key: seriesKey, value: unitPrice > 0 ? String(unitPrice.toFixed(2)) : '' })}
                                            onChange={(e) => {
                                                const val = e.target.value;
                                                if (/^\d*\.?\d*$/.test(val)) {
                                                    setEditingUnitPrice({ key: seriesKey, value: val });
                                                }
                                            }}
                                            onBlur={() => {
                                                if (isEditingThis) {
                                                    handleSeriesChange(vIdx, sIdx, 'unitPrice', editingUnitPrice.value);
                                                    setEditingUnitPrice(null);
                                                }
                                            }}
                                        />
                                        <div className="series-total-price-display" title={t.price}>
                                            {formatCurrency(series.price, series.currency)}
                                        </div>
                                        <select value={series.currency} onChange={(e) => handleSeriesChange(vIdx, sIdx, 'currency', e.target.value)}>
                                            <option value="USD">USD</option>
                                            <option value="EUR">EUR</option>
                                            <option value="TRY">TRY</option>
                                        </select>
                                        <input type="number" placeholder={t.stock} value={series.stock} onChange={(e) => handleSeriesChange(vIdx, sIdx, 'stock', e.target.value)} />
                                        <button className="btn-remove-series" onClick={() => removeSeries(vIdx, sIdx)}>×</button>
                                    </div>
                                );
                            })}
                        </div>
                        <button type="button" className="btn-add-nested" onClick={() => addSeries(vIdx)}>+ {t.addSeries}</button>
                    </div>
                );
            })}
            <button type="button" className="btn-add-variant" onClick={addVariant}>+ {t.addVariant}</button>

            <div className="form-actions">
                <button className="btn-primary" onClick={() => onSave(product)}>{t.saveChanges}</button>
                <button className="btn-secondary" onClick={onCancel}>{t.cancel}</button>
            </div>
        </div>
    );
};

const ProductManager = ({ products, seriesTemplates, collarTypes, contentTemplates, genderTemplates, onFetchData, t, storeId }) => {
    const [editingProduct, setEditingProduct] = useState(null);

    const handleAddNew = () => {
        const newProduct = {
            id: `new_${generateId()}`,
            name: '',
            code: '',
            video_url: '',
            discountPercentage: 0,
            variants: [],
            store_id: storeId,
        };
        setEditingProduct(newProduct);
    };
    
    const handleEdit = (product) => {
        setEditingProduct(product);
    };

    const handleDelete = async (productId) => {
        if (window.confirm(t.deleteConfirm)) {
            const { error } = await db.from('products').delete().eq('id', productId);
            if (error) {
                console.error("Error deleting product:", error);
                alert(`Failed to delete product: ${error.message}`);
            } else {
                onFetchData({storeId});
            }
        }
    };
    
    const handleSave = async (productToSave) => {
        try {
            // 1. Upsert Product
            const { data: productData, error: productError } = await db
                .from('products')
                .upsert({
                    id: productToSave.id.startsWith('new_') ? undefined : productToSave.id,
                    name: productToSave.name,
                    code: productToSave.code,
                    video_url: productToSave.video_url,
                    season: productToSave.season,
                    collar_type: productToSave.collarType,
                    content: productToSave.content,
                    gender: productToSave.gender,
                    discount_percentage: productToSave.discountPercentage,
                    store_id: storeId,
                })
                .select()
                .single();

            if (productError) throw productError;
            if (!productData) throw new Error("Product data not returned after save.");

            const savedProductId = productData.id;

            // For updates, we need to clear old variants and series to avoid FK issues
            if (!productToSave.id.startsWith('new_')) {
                const { data: oldVariants, error: fetchError } = await db.from('variants').select('id').eq('product_id', savedProductId);
                
                if (fetchError) throw fetchError;

                if (oldVariants && oldVariants.length > 0) {
                    const oldVariantIds = oldVariants.map(v => v.id);
                    
                    // Delete associated series first
                    const { error: seriesDeleteError } = await db.from('series').delete().in('variant_id', oldVariantIds);
                    if (seriesDeleteError) throw seriesDeleteError;
                    
                    // Then delete the variants
                    const { error: variantsDeleteError } = await db.from('variants').delete().in('id', oldVariantIds);
                    if (variantsDeleteError) throw variantsDeleteError;
                }
            }

            // 2. Insert new variants and their series
            for (const variant of productToSave.variants) {
                const { data: variantData, error: variantError } = await db
                    .from('variants')
                    .insert({
                        product_id: savedProductId,
                        color_name: variant.colorName,
                        color_code: variant.colorCode,
                        image_url: variant.imageUrl,
                        video_url: variant.video_url || null
                    })
                    .select()
                    .single();

                if (variantError) throw variantError;
                if (!variantData) throw new Error("Variant data not returned after save.");
                
                const savedVariantId = variantData.id;

                if (variant.series && variant.series.length > 0) {
                    const seriesToInsert = variant.series.map(s => ({
                        variant_id: savedVariantId,
                        name: s.name,
                        price: s.price,
                        currency: s.currency,
                        stock: s.stock
                    }));
                    const { error: seriesError } = await db.from('series').insert(seriesToInsert);
                    if (seriesError) throw seriesError;
                }
            }

            alert("Product saved successfully!");
            onFetchData({storeId});
            setEditingProduct(null);

        } catch (error: any) {
            console.error("Error saving product:", error);
            const errorMessage = error?.message || JSON.stringify(error) || 'An unknown error occurred.';
            alert(`Failed to save product: ${errorMessage}`);
        }
    };
    
    if (editingProduct) {
        return <ProductForm 
          product={editingProduct} 
          seriesTemplates={seriesTemplates}
          collarTypes={collarTypes}
          contentTemplates={contentTemplates}
          genderTemplates={genderTemplates}
          onSave={handleSave} 
          onCancel={() => setEditingProduct(null)} 
          t={t}
          storeId={storeId}
        />;
    }

    return (
        <div>
            <div className="admin-header">
                <h2>{t.productManagement}</h2>
                <button className="btn-primary" onClick={handleAddNew}>+ {t.addNewProduct}</button>
            </div>
            <div className="admin-product-list">
                {products.map((product) => (
                    <div key={product.id} className="admin-product-row">
                        <img src={getTransformedImageUrl(product.variants[0]?.imageUrl, { width: 120, height: 120 }) || ''} alt={product.name} className="admin-product-thumb" crossOrigin="anonymous" />
                        <div className="admin-product-info">
                            <h4>{product.name}</h4>
                            <p>{product.code}</p>
                        </div>
                        <div className="admin-product-actions">
                            <button className="btn-secondary" onClick={() => handleEdit(product)}>{t.edit}</button>
                            <button className="btn-danger" onClick={() => handleDelete(product.id)}>{t.delete}</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const QuickStockManager = ({ products, onFetchData, t, storeId }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [isUpdating, setIsUpdating] = useState(null);
    const [stockInputs, setStockInputs] = useState({});

    const allVariants = useMemo(() => {
        return products.flatMap((p) =>
            p.variants.map((v) => ({
                ...v,
                product: p
            }))
        );
    }, [products]);

    const filteredVariants = useMemo(() => {
        if (!searchQuery.trim()) {
            return [];
        }

        const lowerCaseQuery = searchQuery.toLowerCase().trim();
        const terms = lowerCaseQuery.split(/\s+/).filter(Boolean);

        return allVariants.filter((variant) => {
            const productInfo = `${variant.product.code.toLowerCase()} ${variant.product.name.toLowerCase()}`;
            const variantInfo = variant.colorName.toLowerCase();

            return terms.every(term =>
                productInfo.includes(term) || variantInfo.includes(term)
            );
        }).slice(0, 50);
    }, [searchQuery, allVariants]);
    
    const handleStockInputChange = (variantId, value) => {
        setStockInputs(prev => ({ ...prev, [variantId]: value }));
    };

    const handleSetStock = async (variant, stockValueStr) => {
        const stockValue = Number(stockValueStr);
        if (isNaN(stockValue) || stockValue < 0) {
            alert("Please enter a valid, non-negative number for the stock quantity.");
            return;
        }

        const confirmMessage = stockValue === 0
            ? t.stockUpdateConfirm
            : t.stockUpdateConfirmWithValue.replace('{value}', String(stockValue));

        if (window.confirm(confirmMessage)) {
            setIsUpdating(variant.id);
            const { error } = await db
                .from('series')
                .update({ stock: stockValue })
                .eq('variant_id', variant.id);

            if (error) {
                alert(`Failed to update stock: ${error.message}`);
                console.error("Stock update error:", error);
            } else {
                alert(t.stockUpdatedSuccess);
                onFetchData({storeId});
                setStockInputs(prev => ({ ...prev, [variant.id]: '' }));
            }
            setIsUpdating(null);
        }
    };

    return (
        <div>
            <div className="admin-header">
                <h2>{t.quickStock}</h2>
            </div>
            <div className="form-group">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={t.searchByCodeAndColor}
                    className="quick-stock-search-input"
                    autoFocus
                />
            </div>
            <div className="quick-stock-results-list">
                {filteredVariants.map((variant) => {
                    const totalStock = variant.series.reduce((sum, s) => sum + s.stock, 0);
                    const isBeingUpdated = isUpdating === variant.id;
                    const currentInputValue = stockInputs[variant.id] || '';

                    return (
                        <div key={variant.id} className="quick-stock-item">
                            <img
                                src={getTransformedImageUrl(variant.imageUrl, { width: 120, height: 120 })}
                                alt={variant.colorName}
                                className="quick-stock-item-thumb"
                                crossOrigin="anonymous"
                            />
                            <div className="quick-stock-item-info">
                                <h4>{`${variant.product.name} (${variant.product.code})`}</h4>
                                <p>{variant.colorName}</p>
                                <p>{t.totalStock}: <strong>{totalStock}</strong></p>
                            </div>
                            <div className="quick-stock-item-actions">
                                <div className="quick-stock-input-group">
                                    <input
                                        type="number"
                                        placeholder="Qty"
                                        className="quantity-input"
                                        value={currentInputValue}
                                        onChange={(e) => handleStockInputChange(variant.id, e.target.value)}
                                        disabled={isBeingUpdated}
                                        min="0"
                                    />
                                    <button
                                        className="btn-secondary"
                                        onClick={() => handleSetStock(variant, currentInputValue)}
                                        disabled={isBeingUpdated || currentInputValue === ''}
                                    >{t.set}</button>
                                    <button
                                        className="btn-danger"
                                        onClick={() => handleSetStock(variant, '0')}
                                        disabled={totalStock === 0 || isBeingUpdated}
                                    >{t.setToZero}</button>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    );
};

const URLVideoUploader = ({ product, onUpdate, t }) => {
    const [urlInput, setUrlInput] = useState('');
    const [isEditing, setIsEditing] = useState(false);

    const handleSave = () => {
        if (urlInput.trim()) {
            onUpdate(product.id, urlInput.trim());
        }
        setIsEditing(false);
    };

    if (!isEditing) {
        return <button
            className="btn-link-style"
            onClick={() => {
                setUrlInput(product.video_url || '');
                setIsEditing(true);
            }}
        >{t.pasteVideoUrl}</button>;
    }

    return (
        <div className="url-upload-controls">
            <input
                type="url"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                placeholder="https://.../video.mp4"
                autoFocus
            />
            <div className="url-upload-actions">
                <button className="btn-secondary" onClick={() => setIsEditing(false)}>{t.cancel}</button>
                <button className="btn-primary" onClick={handleSave}>{t.saveUrl}</button>
            </div>
        </div>
    );
};

const ShortsManager = ({ products, onFetchData, t, storeId }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [uploadingId, setUploadingId] = useState(null);

    const filteredProducts = useMemo(() => {
        if (!searchQuery.trim()) {
            return products;
        }
        const lowerCaseQuery = searchQuery.toLowerCase().trim();
        return products.filter(p =>
            p.name.toLowerCase().includes(lowerCaseQuery) ||
            p.code.toLowerCase().includes(lowerCaseQuery)
        );
    }, [searchQuery, products]);

    const updateVideoUrl = async (productId, newUrl) => {
        const { error } = await db.from('products').update({ video_url: newUrl }).eq('id', productId);
        if (error) {
            alert(`${t.videoUpdateFailed}: ${error.message}`);
            console.error('Video URL update error:', error);
        } else {
            onFetchData({ storeId, preventLoader: true });
        }
    };

    const handleVideoUpload = async (e, product) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploadingId(product.id);

        const filePath = `public/${storeId}/${Date.now()}-${file.name.replace(/\s/g, '_')}`;
        const { error: uploadError } = await db.storage.from('product-videos').upload(filePath, file);

        if (uploadError) {
            alert(`Video upload failed: ${uploadError.message}`);
            console.error('Video upload error:', uploadError);
            setUploadingId(null);
            return;
        }

        const { data } = db.storage.from('product-videos').getPublicUrl(filePath);
        if (data.publicUrl) {
            await updateVideoUrl(product.id, data.publicUrl);
            alert(t.videoUploadSuccess);
        }
        setUploadingId(null);
    };

    const handleRemoveVideo = async (product) => {
        if (window.confirm(t.removeVideoConfirm)) {
            if (product.video_url && product.video_url.includes('/product-videos/')) {
                try {
                    const url = new URL(product.video_url);
                    const path = url.pathname.split(`/product-videos/public/${storeId}/`)[1];
                    if (path) {
                        await db.storage.from('product-videos').remove([`public/${storeId}/${path}`]);
                    }
                } catch (e) {
                    console.error("Could not parse or delete video from storage:", e);
                }
            }
            await updateVideoUrl(product.id, null);
        }
    };

    return (
        <div>
            <div className="admin-header">
                <h2>{t.shortsManagement}</h2>
            </div>
            <div className="form-group">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={t.searchByProductNameOrCode}
                    className="quick-stock-search-input"
                />
            </div>
            <div className="quick-stock-results-list">
                {filteredProducts.map(product => {
                    const isUploading = uploadingId === product.id;
                    return <div key={product.id} className="quick-stock-item shorts-manager-item">
                        <img
                            src={getTransformedImageUrl(product.variants[0]?.imageUrl, { width: 140, height: 140 })}
                            alt={product.name}
                            className="quick-stock-item-thumb"
                            crossOrigin="anonymous"
                        />
                        <div className="quick-stock-item-info">
                            <h4>{product.name}</h4>
                            <p>{product.code}</p>
                        </div>
                        <div className="shorts-manager-item-actions">
                            {product.video_url && (
                                <div className="shorts-manager-item-video-wrapper">
                                    <video
                                        src={product.video_url}
                                        className="shorts-manager-item-video-preview"
                                        controls
                                        muted
                                        playsInline
                                        key={product.video_url}
                                    />
                                    <button className="btn-danger" onClick={() => handleRemoveVideo(product)}>{t.removeVideo}</button>
                                </div>
                            )}
                            {isUploading ? <p className="upload-progress-indicator">{t.uploadingVideo}</p> : (
                                <>
                                  <div className="upload-controls">
                                      <input
                                          type="file"
                                          id={`video-upload-${product.id}`}
                                          accept="video/*"
                                          style={{ display: 'none' }}
                                          onChange={(e) => handleVideoUpload(e, product)}
                                      />
                                      <label htmlFor={`video-upload-${product.id}`} className="btn-secondary">
                                          {product.video_url ? t.changeVideo : t.addVideo}
                                      </label>
                                  </div>
                                  <URLVideoUploader
                                      product={product}
                                      onUpdate={updateVideoUrl}
                                      t={t}
                                  />
                                </>
                            )}
                        </div>
                    </div>
                })}
            </div>
        </div>
    );
};


const SeriesTemplatesManager = ({ templates, onFetchData, t }) => {
    const [editingTemplate, setEditingTemplate] = useState(null);

    const handleSave = async (templateToSave) => {
        const { error } = await db.from('series_templates').upsert({
            id: templateToSave.id.startsWith('new_') ? undefined : templateToSave.id,
            name: templateToSave.name,
            series_names: templateToSave.seriesNames
        });

        if (error) {
            console.error("Error saving template:", error);
            alert(`Failed to save template: ${error.message}`);
        } else {
            onFetchData();
            setEditingTemplate(null);
        }
    };

    const handleDelete = async (templateId) => {
        if (window.confirm(t.deleteConfirm)) {
            const { error } = await db.from('series_templates').delete().eq('id', templateId);
            if(error) {
                console.error("Error deleting template:", error);
                alert(`Failed to delete template: ${error.message}`);
            } else {
                onFetchData();
            }
        }
    };

    const handleAddNew = () => {
        setEditingTemplate({ id: `new_${generateId()}`, name: '', seriesNames: [] });
    };

    if (editingTemplate) {
        return <TemplateForm template={editingTemplate} onSave={handleSave} onCancel={() => setEditingTemplate(null)} t={t} />;
    }

    return (
        <div>
            <div className="admin-header">
                <h2>{t.seriesTemplates}</h2>
                <button className="btn-primary" onClick={handleAddNew}>+ {t.addNewTemplate}</button>
            </div>
            <div className="template-list">
                {templates.map((template) => (
                    <div key={template.id} className="template-item">
                        <div className="template-info">
                            <h4>{template.name}</h4>
                            <p>{template.seriesNames.join(', ')}</p>
                        </div>
                        <div className="template-actions">
                            <button className="btn-secondary" onClick={() => setEditingTemplate(template)}>{t.edit}</button>
                            <button className="btn-danger" onClick={() => handleDelete(template.id)}>{t.delete}</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const TemplateForm = ({ template: initialTemplate, onSave, onCancel, t }) => {
    const [template, setTemplate] = useState(initialTemplate);
    const [seriesText, setSeriesText] = useState(initialTemplate.seriesNames.join('\n'));

    const handleSave = () => {
        onSave({ ...template, seriesNames: seriesText.split('\n').filter((s) => s.trim() !== '') });
    };
    
    return (
        <div className="template-edit-form">
            <h2>{template.id.startsWith('new_') ? t.addNewTemplate : t.editTemplate}</h2>
            <div className="form-group">
                <label>{t.templateName}</label>
                <input type="text" value={template.name} onChange={(e) => setTemplate({ ...template, name: e.target.value })} />
            </div>
            <div className="form-group">
                <label>{t.seriesNamesHelp}</label>
                <textarea rows={6} value={seriesText} onChange={(e) => setSeriesText(e.target.value)} />
            </div>
            <div className="form-actions">
                <button className="btn-primary" onClick={handleSave}>{t.saveChanges}</button>
                <button className="btn-secondary" onClick={onCancel}>{t.cancel}</button>
            </div>
        </div>
    );
};

const StoreSettingsEditor = ({ settings, onFetchData, t }) => {
    const [currentSettings, setCurrentSettings] = useState(settings);
    
    useEffect(() => {
        setCurrentSettings(settings);
    }, [settings]);

    const handleSettingChange = (e) => {
        const { name, value } = e.target;
        setCurrentSettings((s) => ({ ...s, [name]: value }));
    };

    const handleLogoUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            if (typeof reader.result === 'string') {
                const logoDataUrl = reader.result;
                setCurrentSettings((s) => ({ ...s, logo: logoDataUrl }));
            }
        };
        reader.readAsDataURL(file);
    };
    
    const handleSave = async () => {
        const { name, logo, brand, manufacturer_title, origin, name_color } = currentSettings;
        const { error } = await db.from('stores').update({
            name,
            logo,
            brand,
            manufacturer_title,
            origin,
            name_color
        }).eq('id', settings.id);

        if (error) {
            alert(`Failed to save settings: ${error.message}`);
            console.error(error);
        } else {
            alert("Settings saved!");
            onFetchData({ storeId: settings.id });
        }
    };

    return (
        <div className="settings-form">
            <div className="admin-header">
                <h2>{t.storeSettings}</h2>
            </div>
            <div className="form-group">
                <label>{t.storeNameLabel}</label>
                <input type="text" name="name" value={currentSettings.name || ''} onChange={handleSettingChange} />
            </div>
            <div className="form-group">
                <label>{t.storeNameColor}</label>
                <input type="color" name="name_color" value={currentSettings.name_color || '#192A56'} onChange={handleSettingChange} className="color-input" />
            </div>
            <div className="form-group">
                <label>{t.brandLabel}</label>
                <input type="text" name="brand" value={currentSettings.brand || ''} onChange={handleSettingChange} />
            </div>
            <div className="form-group">
                <label>{t.manufacturerTitleLabel}</label>
                <input type="text" name="manufacturer_title" value={currentSettings.manufacturer_title || ''} onChange={handleSettingChange} />
            </div>
            <div className="form-group">
                <label>{t.originLabel}</label>
                <input type="text" name="origin" value={currentSettings.origin || ''} onChange={handleSettingChange} />
            </div>
            <div className="form-group">
                <label>{t.storeLogoLabel}</label>
                <div className="image-upload-container">
                    {currentSettings.logo && <img src={currentSettings.logo} alt="Logo Preview" className="logo-preview" />}
                    <input type="file" id="logoUpload" style={{ display: 'none' }} accept="image/*" onChange={handleLogoUpload} />
                    <label htmlFor="logoUpload" className="btn-secondary">{t.uploadLogo}</label>
                </div>
            </div>
            <div className="form-actions">
                <button className="btn-primary" onClick={handleSave}>{t.saveChanges}</button>
            </div>
        </div>
    );
};


const AdminPanel = ({ products, seriesTemplates, storeSettings, collarTypes, contentTemplates, genderTemplates, onFetchData, t, activeTab, onActiveTabChange, onExit, onLogout }) => {
    return (
        <div className="admin-panel">
             <div className="admin-header">
                <h2>{t.admin}</h2>
                <div style={{display: 'flex', gap: '12px'}}>
                    <button className="btn-danger" onClick={onLogout}>{t.logout}</button>
                    <button className="btn-secondary" onClick={onExit}>{t.viewCatalog}</button>
                </div>
            </div>
            <nav className="admin-nav">
                <button onClick={() => onActiveTabChange('products')} className={activeTab === 'products' ? 'active' : ''}>{t.productManager}</button>
                <button onClick={() => onActiveTabChange('quickStock')} className={activeTab === 'quickStock' ? 'active' : ''}>{t.quickStock}</button>
                <button onClick={() => onActiveTabChange('shorts')} className={activeTab === 'shorts' ? 'active' : ''}>{t.shortsManagement}</button>
                <button onClick={() => onActiveTabChange('templates')} className={activeTab === 'templates' ? 'active' : ''}>{t.templatesAndTypes}</button>
                <button onClick={() => onActiveTabChange('settings')} className={activeTab === 'settings' ? 'active' : ''}>{t.storeSettings}</button>
            </nav>
            <div className="admin-content">
                {activeTab === 'products' && <ProductManager products={products} seriesTemplates={seriesTemplates} collarTypes={collarTypes} contentTemplates={contentTemplates} genderTemplates={genderTemplates} onFetchData={onFetchData} t={t} storeId={storeSettings.id} />}
                {activeTab === 'quickStock' && <QuickStockManager products={products} onFetchData={onFetchData} t={t} storeId={storeSettings.id} />}
                {activeTab === 'shorts' && <ShortsManager products={products} onFetchData={onFetchData} t={t} storeId={storeSettings.id} />}
                {activeTab === 'templates' && (
                    <>
                        <SeriesTemplatesManager templates={seriesTemplates} onFetchData={onFetchData} t={t} />
                        <div className="admin-section-divider" />
                        <CollarTypesManager collarTypes={collarTypes} onFetchData={onFetchData} t={t} />
                        <div className="admin-section-divider" />
                        <ContentManager contentTemplates={contentTemplates} onFetchData={onFetchData} t={t} />
                        <div className="admin-section-divider" />
                        <GenderManager genderTemplates={genderTemplates} onFetchData={onFetchData} t={t} />
                    </>
                )}
                {activeTab === 'settings' && <StoreSettingsEditor settings={storeSettings} onFetchData={onFetchData} t={t} />}
            </div>
        </div>
    );
};


// --- GALLERY VIEW ---
const FilterSidebar = ({ isOpen, onClose, products, activeFilters, setActiveFilters, t }) => {
    const filterOptions = useMemo(() => {
        const seasons = new Set<string>();
        const collarTypes = new Set<string>();
        const seriesNames = new Set<string>();
        const genders = new Set<string>();

        products.forEach((p) => {
            if (p.season) seasons.add(p.season);
            if (p.collarType) collarTypes.add(p.collarType);
            if (p.gender) genders.add(p.gender);
            p.variants.forEach(v => {
                v.series.forEach(s => {
                    if (s.name) seriesNames.add(s.name);
                });
            });
        });

        return {
            seasons: Array.from(seasons),
            collarTypes: Array.from(collarTypes),
            seriesNames: Array.from(seriesNames).sort(),
            genders: Array.from(genders),
        };
    }, [products]);

    const handleCheckboxChange = (category, value) => {
        const currentCategoryFilters = activeFilters[category];
        const newCategoryFilters = new Set(currentCategoryFilters);
        if (newCategoryFilters.has(value)) {
            newCategoryFilters.delete(value);
        } else {
            newCategoryFilters.add(value);
        }
        setActiveFilters((prev) => ({ ...prev, [category]: Array.from(newCategoryFilters) }));
    };

    const handleDiscountToggle = () => {
        setActiveFilters(prev => ({ ...prev, discounted: !prev.discounted }));
    };

    const resetFilters = () => {
        setActiveFilters({ seasons: [], collarTypes: [], seriesNames: [], genders: [], discounted: false });
    };

    return (
        <>
            <div className={`cart-overlay ${isOpen ? 'open' : ''}`} onClick={onClose} />
            <aside className={`filter-sidebar ${isOpen ? 'open' : ''}`}>
                <header className="cart-header">
                    <h2 id="filter-heading">{t.filters}</h2>
                    <button className="close-cart-btn" onClick={onClose} aria-label="Close filters">×</button>
                </header>
                <div className="cart-body">
                    <div className="filter-section">
                        <h3>{t.discount}</h3>
                        <div className="filter-option">
                            <input
                                type="checkbox"
                                id="discount-filter"
                                checked={activeFilters.discounted || false}
                                onChange={handleDiscountToggle}
                            />
                            <label htmlFor="discount-filter">{t.discountedProducts}</label>
                        </div>
                    </div>
                    <div className="filter-section">
                        <h3>{t.season}</h3>
                        {filterOptions.seasons.map(season => (
                            <div key={season} className="filter-option">
                                <input
                                    type="checkbox"
                                    id={`season-${season}`}
                                    checked={activeFilters.seasons.includes(season)}
                                    onChange={() => handleCheckboxChange('seasons', season)}
                                />
                                <label htmlFor={`season-${season}`}>{t[getTranslationKey(season)] || season}</label>
                            </div>
                        ))}
                    </div>
                    <div className="filter-section">
                        <h3>{t.collarType}</h3>
                        {filterOptions.collarTypes.map(type => (
                            <div key={type} className="filter-option">
                                <input
                                    type="checkbox"
                                    id={`collar-${type.replace(' ','-')}`}
                                    checked={activeFilters.collarTypes.includes(type)}
                                    onChange={() => handleCheckboxChange('collarTypes', type)}
                                />
                                <label htmlFor={`collar-${type.replace(' ','-')}`}>{t[getTranslationKey(type)] || type}</label>
                            </div>
                        ))}
                    </div>
                    <div className="filter-section">
                        <h3>{t.gender}</h3>
                        {filterOptions.genders.map(gender => (
                            <div key={gender} className="filter-option">
                                <input
                                    type="checkbox"
                                    id={`gender-${gender}`}
                                    checked={activeFilters.genders.includes(gender)}
                                    onChange={() => handleCheckboxChange('genders', gender)}
                                />
                                <label htmlFor={`gender-${gender}`}>{t[getTranslationKey(gender)] || gender}</label>
                            </div>
                        ))}
                    </div>
                    <div className="filter-section">
                        <h3>{t.series}</h3>
                        {filterOptions.seriesNames.map(name => (
                            <div key={name} className="filter-option">
                                <input
                                    type="checkbox"
                                    id={`series-${name.replace(' ','-')}`}
                                    checked={activeFilters.seriesNames.includes(name)}
                                    onChange={() => handleCheckboxChange('seriesNames', name)}
                                />
                                <label htmlFor={`series-${name.replace(' ','-')}`}>{name}</label>
                            </div>
                        ))}
                    </div>
                </div>
                 <footer className="cart-footer">
                    <button className="btn-secondary" style={{width: '100%'}} onClick={resetFilters}>{t.resetFilters}</button>
                </footer>
            </aside>
        </>
    );
};


const BulkAddToCartModal = ({ isOpen, onClose, selectedVariants, onConfirm, t }) => {
    const [items, setItems] = useState({});

    useEffect(() => {
        if (isOpen) {
            const initialItems = {};
            selectedVariants.forEach((v) => {
                initialItems[v.id] = {};
                v.series.forEach((s) => {
                    initialItems[v.id][s.id] = 0; // Default all series quantities to 0
                });
            });
            setItems(initialItems);
        }
    }, [isOpen, selectedVariants]);
    
    if (!isOpen) return null;

    const handleItemChange = (variantId, seriesId, value) => {
        const variant = selectedVariants.find((v) => v.id === variantId);
        const series = variant?.series.find((s) => s.id === seriesId);
        if (!series) return;
    
        const quantity = parseInt(value, 10);
        let finalQuantity = 0;
        if (!isNaN(quantity) && quantity >= 0) {
            finalQuantity = Math.min(quantity, series.stock);
        }
        
        setItems(prev => ({
            ...prev,
            [variantId]: {
                ...prev[variantId],
                [seriesId]: finalQuantity
            }
        }));
    };

    const handleQuantityStep = (variantId, seriesId, step) => {
        const variant = selectedVariants.find((v) => v.id === variantId);
        const series = variant?.series.find((s) => s.id === seriesId);
        if (!series) return;

        setItems(prev => {
            const currentQuantity = prev[variantId]?.[seriesId] || 0;
            const newQuantity = Math.max(0, currentQuantity + step);
            return {
                ...prev,
                [variantId]: {
                    ...prev[variantId],
                    [seriesId]: Math.min(newQuantity, series.stock)
                }
            };
        });
    };

    const handleConfirm = () => {
        const itemsToCart = [];
        selectedVariants.forEach((v) => {
            const variantItems = items[v.id];
            if (variantItems) {
                Object.entries(variantItems).forEach(([seriesId, quantity]) => {
                    if (quantity > 0) {
                        const series = v.series.find(s => s.id === seriesId);
                        if (series) {
                            itemsToCart.push({
                                product: v.product,
                                variant: v,
                                series,
                                quantity
                            });
                        }
                    }
                });
            }
        });
        onConfirm(itemsToCart);
    };

    return (
         <div className="modal-overlay" onClick={onClose}>
            <div className="modal-container bulk-add-modal" onClick={(e) => e.stopPropagation()}>
                <header className="modal-header">
                    <h3>{t.configureItems}</h3>
                    <button className="close-modal-btn" onClick={onClose}>×</button>
                </header>
                <div className="modal-body">
                    {selectedVariants.map((variant) => {
                        const variantItems = items[variant.id];
                        if (!variantItems) return null;
                        return (
                            <div key={variant.id} className="bulk-add-item">
                                <img src={getTransformedImageUrl(variant.imageUrl, { width: 160, height: 160 })} className="bulk-add-item-img" alt={variant.colorName} />
                                <div className="bulk-add-item-details">
                                    <p className="bulk-add-item-name">{`${variant.product.name} (${variant.product.code})`}</p>
                                    <p className="bulk-add-item-color">{variant.colorName}</p>
                                    <div className="bulk-add-series-list">
                                        {variant.series.map((series) => {
                                            const isOutOfStock = series.stock <= 0;
                                            return (
                                                <div key={series.id} className="bulk-add-series-row">
                                                    <span className="series-row-name">{series.name}</span>
                                                    {isOutOfStock ? (
                                                        <span className="out-of-stock-label">{t.outOfStock}</span>
                                                    ) : (
                                                        <div className="quantity-stepper">
                                                            <button onClick={() => handleQuantityStep(variant.id, series.id, -1)} disabled={(variantItems[series.id] || 0) <= 0}>-</button>
                                                            <input
                                                                type="number"
                                                                min="0"
                                                                max={series.stock}
                                                                value={variantItems[series.id] || 0}
                                                                onChange={(e) => handleItemChange(variant.id, series.id, e.target.value)}
                                                                aria-label={`Quantity for ${series.name}`}
                                                            />
                                                            <button onClick={() => handleQuantityStep(variant.id, series.id, 1)} disabled={(variantItems[series.id] || 0) >= series.stock}>+</button>
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <footer className="modal-footer">
                    <button className="btn-secondary" onClick={onClose}>{t.cancel}</button>
                    <button className="btn-primary" onClick={handleConfirm}>{t.confirmAddToCart}</button>
                </footer>
            </div>
        </div>
    );
};

const ProductAlbumCard = ({ productGroup, onClick, t, seriesNameToTemplateMap }) => {
    const { product, variants } = productGroup;
    const coverImage = variants[0]?.imageUrl;
    const variantCount = variants.length;
    const imageRenderSize = 240;

    const seriesInfo = useMemo(() => {
        const uniqueSeries = new Map();
        variants.forEach((v) => {
            v.series.forEach((s) => {
                if (!uniqueSeries.has(s.name) && Number(s.price) > 0) {
                    uniqueSeries.set(s.name, { price: s.price, currency: s.currency });
                }
            });
        });

        const infoWithAbbr = Array.from(uniqueSeries.entries()).map(([name, data]) => {
            const units = getUnitsPerSeries(name);
            if (units <= 0) return null;
            const numericUnitPrice = Number((data as any).price) / units;
            
            const templateName = seriesNameToTemplateMap.get(name);
            const abbreviation = templateName
                ? templateName.charAt(0).toUpperCase()
                : name.charAt(0).toUpperCase();

            return {
                abbreviation,
                numericUnitPrice,
                currency: (data as any).currency
            };
        }).filter(Boolean);

        const infoByAbbreviation = new Map();
        infoWithAbbr.forEach(item => {
            if (item && !infoByAbbreviation.has(item.abbreviation)) {
                infoByAbbreviation.set(item.abbreviation, { numericUnitPrice: item.numericUnitPrice, currency: item.currency });
            }
        });

        const finalInfo = Array.from(infoByAbbreviation.entries()).map(([abbreviation, data]) => ({
            abbreviation,
            numericUnitPrice: data.numericUnitPrice,
            unitPrice: formatCurrency(data.numericUnitPrice, data.currency),
            currency: data.currency
        }));
        
        return finalInfo.sort((a, b) => a.numericUnitPrice - b.numericUnitPrice);
    }, [variants, seriesNameToTemplateMap]);

    return (
        <div className="product-album-card" onClick={onClick}>
            <div className="album-card-image-container">
                <img src={getTransformedImageUrl(coverImage, { width: imageRenderSize, height: imageRenderSize })} alt={product.name} />
            </div>
            <div className="album-card-info">
                <p className="album-card-code">
                    <span>{`${product.name} - ${product.code}`}</span>
                    {product.discountPercentage > 0 && <span className="discount-tag">{`%${product.discountPercentage}`}</span>}
                </p>
                <p className="album-card-count">{`${variantCount} ${t.colors}`}</p>
                {seriesInfo.length > 0 &&
                    <div className="album-card-series-info">
                        {seriesInfo.map((s, index) => {
                            if (typeof product.discountPercentage === 'number' && product.discountPercentage > 0) {
                                const discountedUnitPrice = s.numericUnitPrice * (1 - (product.discountPercentage / 100));
                                return (
                                    <span key={index} className="series-price-item discount">
                                        {`${s.abbreviation}: `}
                                        <span className="original-price">{s.unitPrice}</span>
                                        <span className="discounted-price">
                                            {formatCurrency(discountedUnitPrice, s.currency)}
                                        </span>
                                    </span>
                                );
                            } else {
                                return (
                                    <span key={index}>{`${s.abbreviation}: ${s.unitPrice}`}</span>
                                );
                            }
                        })}
                    </div>
                }
            </div>
        </div>
    );
};


const ImageViewer = ({ images, currentIndex, onClose, t, onSelectOptions }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(currentIndex);
    const [zoom, setZoom] = useState(1);
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0, offX: 0, offY: 0 });
    const [isLoading, setIsLoading] = useState(true);
    const [isSharing, setIsSharing] = useState(false);
    const imageRef = useRef<HTMLImageElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const pinchStartDist = useRef(0);
    const touchStartX = useRef(0);
    const touchEndX = useRef(0);

    const image = images[currentImageIndex];
    
    // Preload next and previous images for smoother navigation
    useEffect(() => {
        if (images.length <= 1) return;

        const totalImages = images.length;
        const nextIndex = (currentImageIndex + 1) % totalImages;
        const prevIndex = (currentImageIndex - 1 + totalImages) % totalImages;
        
        const nextImage = images[nextIndex];
        const prevImage = images[prevIndex];

        if (nextImage) {
            const nextImageLoader = new Image();
            nextImageLoader.src = getTransformedImageUrl(nextImage.imageUrl, {width: 2048, height: 2048, resize: 'contain', quality: 90});
        }
        
        if (prevImage) {
            const prevImageLoader = new Image();
            prevImageLoader.src = getTransformedImageUrl(prevImage.imageUrl, {width: 2048, height: 2048, resize: 'contain', quality: 90});
        }

    }, [currentImageIndex, images]);

    const resetZoomAndPan = useCallback(() => {
        setZoom(1);
        setOffset({ x: 0, y: 0 });
    }, []);

    useEffect(() => {
        resetZoomAndPan();
        setIsLoading(true);
    }, [currentImageIndex, resetZoomAndPan]);

    const handleNavigate = useCallback((direction: 'next' | 'prev') => {
        const totalImages = images.length;
        if (totalImages <= 1) return;
        let newIndex;
        if (direction === 'next') {
            newIndex = (currentImageIndex + 1) % totalImages;
        } else {
            newIndex = (currentImageIndex - 1 + totalImages) % totalImages;
        }
        setCurrentImageIndex(newIndex);
    }, [currentImageIndex, images.length]);
    
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowRight') handleNavigate('next');
            else if (e.key === 'ArrowLeft') handleNavigate('prev');
            else if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleNavigate, onClose]);

    const handleShareImage = async () => {
        if (!navigator.share) {
            alert('Sharing is not supported on this browser.');
            return;
        }
        setIsSharing(true);
        try {
            const currentImage = images[currentImageIndex];
            const imageUrl = getTransformedImageUrl(currentImage.imageUrl, { width: 1024, height: 1024, resize: 'contain', quality: 90 });
            
            const response = await fetch(imageUrl);
            const blob = await response.blob();
            const file = new File([blob], `${currentImage.product.code}.png`, { type: 'image/png' });

            const shareData = {
                title: `${currentImage.product.name} - ${currentImage.product.code}`,
                text: `${currentImage.product.name} (${currentImage.product.code}) - ${currentImage.colorName}`,
                files: [file],
            };
            
            if (navigator.canShare && navigator.canShare(shareData)) {
                await navigator.share(shareData);
            } else {
                 await navigator.share({
                    title: shareData.title,
                    text: shareData.text,
                    url: window.location.href
                 });
            }
        } catch (error: any) {
            if (error.name !== 'AbortError') {
                console.error('Error sharing:', error);
                alert('Could not share the image.');
            }
        } finally {
            setIsSharing(false);
        }
    };

    const handleAddToCartClick = () => {
        const currentImage = images[currentImageIndex];
        onSelectOptions(currentImage.product, currentImage);
        onClose();
    };

    const clampOffset = useCallback((newOffset: {x: number, y: number}, currentZoom: number) => {
        if (!imageRef.current || !containerRef.current || currentZoom <= 1) {
            return { x: 0, y: 0 };
        }
        const imageNode = imageRef.current;
        const containerNode = containerRef.current;
        const containerRect = containerNode.getBoundingClientRect();
        const baseImageWidth = imageNode.clientWidth;
        const baseImageHeight = imageNode.clientHeight;
        const zoomedWidth = baseImageWidth * currentZoom;
        const zoomedHeight = baseImageHeight * currentZoom;
        const overhangX = Math.max(0, zoomedWidth - containerRect.width);
        const overhangY = Math.max(0, zoomedHeight - containerRect.height);
        const maxOffsetX = overhangX / 2;
        const maxOffsetY = overhangY / 2;
        return {
            x: Math.max(-maxOffsetX, Math.min(maxOffsetX, newOffset.x)),
            y: Math.max(-maxOffsetY, Math.min(maxOffsetY, newOffset.y)),
        };
    }, []);

    const handleWheel = useCallback((e: WheelEvent) => {
        e.preventDefault();
        const zoomFactor = 1.1;
        const newZoom = e.deltaY < 0 ? zoom * zoomFactor : zoom / zoomFactor;
        const clampedZoom = Math.max(1, Math.min(newZoom, 5));
        
        if (clampedZoom === zoom || !containerRef.current) return;

        const rect = containerRef.current.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        
        const mouseXRel = mouseX - rect.width / 2;
        const mouseYRel = mouseY - rect.height / 2;
        
        const ratio = clampedZoom / zoom;
        
        const newOffsetX = mouseXRel * (1 - ratio) + offset.x * ratio;
        const newOffsetY = mouseYRel * (1 - ratio) + offset.y * ratio;
        
        setZoom(clampedZoom);
        if (clampedZoom <= 1) {
            setOffset({x:0, y:0});
        } else {
            setOffset(clampOffset({ x: newOffsetX, y: newOffsetY }, clampedZoom));
        }
    }, [zoom, offset, clampOffset]);
    
    const handleMouseDown = (e: React.MouseEvent) => {
        if (zoom <= 1) return;
        e.preventDefault();
        setIsDragging(true);
        setDragStart({ x: e.clientX, y: e.clientY, offX: offset.x, offY: offset.y });
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging) return;
        e.preventDefault();
        const deltaX = e.clientX - dragStart.x;
        const deltaY = e.clientY - dragStart.y;
        const newOffset = {
            x: dragStart.offX + deltaX,
            y: dragStart.offY + deltaY
        };
        setOffset(clampOffset(newOffset, zoom));
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleDoubleClick = () => {
        if (zoom > 1) {
            resetZoomAndPan();
        } else {
            setZoom(2.5);
        }
    };

    const getTouchDistance = (e: TouchEvent) => Math.hypot(e.touches[0].clientX - e.touches[1].clientX, e.touches[0].clientY - e.touches[1].clientY);

    const handleTouchStart = (e: React.TouchEvent) => {
        if (e.touches.length === 2) {
            pinchStartDist.current = getTouchDistance(e as unknown as TouchEvent);
            setIsDragging(false);
            touchStartX.current = 0;
            touchEndX.current = 0;
        } else if (e.touches.length === 1) {
            touchStartX.current = e.touches[0].clientX;
            touchEndX.current = e.touches[0].clientX;
            if (zoom > 1) {
                setIsDragging(true);
                setDragStart({ x: e.touches[0].clientX, y: e.touches[0].clientY, offX: offset.x, offY: offset.y });
            }
        }
    };

    const handleTouchMove = useCallback((e: TouchEvent) => {
        if (e.touches.length === 2 && containerRef.current) {
            e.preventDefault();
            const newDist = getTouchDistance(e);
            if (pinchStartDist.current > 0) {
              const ratio = newDist / pinchStartDist.current;
              const newZoom = Math.max(1, Math.min(zoom * ratio, 5));
              
              if (newZoom !== zoom) {
                  const rect = containerRef.current.getBoundingClientRect();
                  const midX = (e.touches[0].clientX + e.touches[1].clientX) / 2;
                  const midY = (e.touches[0].clientY + e.touches[1].clientY) / 2;
                  const mouseXRel = midX - rect.left - rect.width / 2;
                  const mouseYRel = midY - rect.top - rect.height / 2;
                  const zoomRatio = newZoom / zoom;
                  
                  const newOffsetX = mouseXRel * (1 - zoomRatio) + offset.x * zoomRatio;
                  const newOffsetY = mouseYRel * (1 - zoomRatio) + offset.y * zoomRatio;

                  setZoom(newZoom);
                  if (newZoom <= 1) {
                      setOffset({x: 0, y: 0});
                  } else {
                      setOffset(clampOffset({x: newOffsetX, y: newOffsetY}, newZoom));
                  }
              }
            }
            pinchStartDist.current = newDist;
        } else if (e.touches.length === 1) {
            touchEndX.current = e.touches[0].clientX;
            if (isDragging) {
                const deltaX = e.touches[0].clientX - dragStart.x;
                const deltaY = e.touches[0].clientY - dragStart.y;
                const newOffset = {
                    x: dragStart.offX + deltaX,
                    y: dragStart.offY + deltaY
                };
                setOffset(clampOffset(newOffset, zoom));
            }
        }
    }, [isDragging, dragStart, zoom, offset, clampOffset]);

    const handleTouchEnd = () => {
        if (isDragging) setIsDragging(false);
        if (pinchStartDist.current) pinchStartDist.current = 0;
        
        if (touchStartX.current !== 0 && touchEndX.current !== 0 && zoom <= 1) {
            const deltaX = touchEndX.current - touchStartX.current;
            const SWIPE_THRESHOLD = 50;
            if (deltaX > SWIPE_THRESHOLD) {
                handleNavigate('prev');
            } else if (deltaX < -SWIPE_THRESHOLD) {
                handleNavigate('next');
            }
        }
        
        touchStartX.current = 0;
        touchEndX.current = 0;
        if (zoom <= 1) {
            resetZoomAndPan();
        }
    };

    useEffect(() => {
        const containerNode = containerRef.current;
        if (!containerNode) return;

        const wheelHandler = (e: WheelEvent) => handleWheel(e);
        const touchMoveHandler = (e: TouchEvent) => handleTouchMove(e);

        containerNode.addEventListener('wheel', wheelHandler, { passive: false });
        containerNode.addEventListener('touchmove', touchMoveHandler, { passive: false });

        return () => {
            containerNode.removeEventListener('wheel', wheelHandler);
            containerNode.removeEventListener('touchmove', touchMoveHandler);
        };
    }, [handleWheel, handleTouchMove]);

    if (!image) return null;
    const isPannable = zoom > 1;

    return (
        <div className="image-viewer-overlay" onClick={onClose}>
            <div className="image-viewer-top-controls">
                <button 
                    className="image-viewer-btn share-btn" 
                    onClick={(e) => { e.stopPropagation(); handleShareImage(); }} 
                    disabled={isSharing} 
                    aria-label="Share image" 
                ><ShareIcon /></button>
                <button 
                    className="image-viewer-btn close-btn" 
                    onClick={onClose} 
                    aria-label="Close viewer" 
                ><XIcon /></button>
                <button 
                    className="image-viewer-btn add-to-cart-btn" 
                    onClick={(e) => { e.stopPropagation(); handleAddToCartClick(); }} 
                    aria-label="Add to cart" 
                ><CartPlusIcon /></button>
            </div>
            
            <button 
                className="image-viewer-btn image-viewer-nav prev" 
                onClick={(e) => { e.stopPropagation(); handleNavigate('prev'); }} 
                aria-label="Previous image" 
            ><ChevronLeftIcon /></button>
            
            <div
                ref={containerRef}
                className="image-viewer-container"
                onClick={(e) => e.stopPropagation()}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onDoubleClick={handleDoubleClick}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
            >
                {isLoading && <div className="viewer-loader" />}
                <img
                    ref={imageRef}
                    src={getTransformedImageUrl(image.imageUrl, {width: 2048, height: 2048, resize: 'contain', quality: 90})}
                    alt={`${image.product.name} - ${image.colorName}`}
                    className={`image-viewer-content ${isPannable ? 'pannable' : ''} ${isDragging ? 'panning' : ''} ${isLoading ? 'loading' : ''}`}
                    style={{ 
                        transform: `scale(${zoom}) translate(${offset.x}px, ${offset.y}px)`,
                        transition: isDragging ? 'none' : 'transform 0.1s ease-out',
                        touchAction: 'none'
                    }}
                    onLoad={() => setIsLoading(false)}
                />
            </div>

             <button className="image-viewer-btn image-viewer-nav next" onClick={(e) => { e.stopPropagation(); handleNavigate('next'); }} aria-label="Next image">
                <ChevronRightIcon />
            </button>

            <div className="image-viewer-caption" onClick={(e) => e.stopPropagation()}>
                {`${image.product.name} (${image.product.code}) - ${image.colorName}`}
            </div>
        </div>
    );
};

const LazyImage = ({ src, size, alt }) => {
    if (!src) {
        return <div style={{ width: '100%', height: '100%', backgroundColor: '#f0f0f0' }} />;
    }

    const placeholderSrc = getTransformedImageUrl(src, { width: 24, height: 24, quality: 20, resize: 'cover' });

    const imageWidths = [200, 400, 600, 800, 1200];
    const srcSet = imageWidths
        .map(width => `${getTransformedImageUrl(src, { width, height: width, quality: 80, resize: 'cover' })} ${width}w`)
        .join(', ');

    const defaultSrc = getTransformedImageUrl(src, { width: 400, height: 400, quality: 80, resize: 'cover' });
    
    const [isLoaded, setIsLoaded] = useState(false);
    
    return (
        <>
            <img
                src={placeholderSrc}
                alt={alt}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    filter: 'blur(10px)',
                    transition: 'opacity 0.4s ease-out',
                    opacity: isLoaded ? 0 : 1,
                    transform: 'scale(1.1)',
                    willChange: 'opacity',
                }}
            />
            <img
                src={defaultSrc}
                srcSet={srcSet}
                sizes={`${Math.ceil(size)}px`}
                alt={alt}
                loading="lazy"
                onLoad={() => setIsLoaded(true)}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'opacity 0.4s ease-in',
                    opacity: isLoaded ? 1 : 0,
                    willChange: 'opacity',
                }}
            />
        </>
    );
};


const GalleryView = ({ variants, onBulkAddToCart, onOpenFilters, t, activeFilters, seriesNameToTemplateMap, storeSettings, onSelectOptions }) => {
    const [itemSize, setItemSize] = useState(220);
    useEffect(() => {
        setItemSize(window.innerWidth <= 768 ? 80 : 220);
    }, []);
    const MIN_ITEM_SIZE = 70;
    const MAX_ITEM_SIZE = 400;

    const [selectedVariants, setSelectedVariants] = useState(new Set());
    const [isBulkModalOpen, setIsBulkModalOpen] = useState(false);
    const [itemsToShare, setItemsToShare] = useState([]);
    const [isSharing, setIsSharing] = useState(false);
    const [isSelectMode, setIsSelectMode] = useState(false);
    const [mode, setMode] = useState('albums');
    const [focusedProduct, setFocusedProduct] = useState(null);
    const [viewerIndex, setViewerIndex] = useState(null);

    const containerRef = useRef(null);
    const shareRef = useRef(null);
    const pinchDist = useRef(0);
    
    const isAlbumMode = mode === 'albums' && !focusedProduct;

     const productsInView = useMemo(() => {
        const productMap = new Map();
        variants.forEach((variant) => {
            const p = variant.product;
            if (!productMap.has(p.id)) {
                productMap.set(p.id, { product: p, variants: [] });
            }
            productMap.get(p.id).variants.push(variant);
        });
        
        const unsortedProducts = Array.from(productMap.values());

        const naturalSort = (a, b) => {
            const re = /(\d+)/g;
            const aCode = String(a.product.code || '');
            const bCode = String(b.product.code || '');

            const aParts = aCode.split(re);
            const bParts = bCode.split(re);

            for (let i = 0; i < Math.min(aParts.length, bParts.length); i++) {
                const aPart = aParts[i];
                const bPart = bParts[i];
                
                if (i % 2) { // It's a number part
                    const aInt = parseInt(aPart, 10);
                    const bInt = parseInt(bPart, 10);
                    if (aInt !== bInt) {
                        return aInt - bInt;
                    }
                } else { // It's a string part
                    const aStr = aPart.toLowerCase();
                    const bStr = bPart.toLowerCase();
                    if (aStr !== bStr) {
                        return aStr.localeCompare(bStr);
                    }
                }
            }
            return aParts.length - bParts.length;
        };
        
        return unsortedProducts.sort(naturalSort);
    }, [variants]);
    
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleWheel = (event) => {
            if (event.ctrlKey) {
                event.preventDefault();
                setItemSize(prevSize => {
                    const newSize = prevSize - event.deltaY * 0.5;
                    return Math.max(MIN_ITEM_SIZE, Math.min(MAX_ITEM_SIZE, newSize));
                });
            }
        };

        const getDist = (touches) => Math.hypot(touches[0].pageX - touches[1].pageX, touches[0].pageY - touches[1].pageY);

        const handleTouchStart = (event) => {
            if (event.touches.length === 2) {
                pinchDist.current = getDist(event.touches);
            }
        };

        const handleTouchMove = (event) => {
            if (event.touches.length === 2) {
                event.preventDefault();
                const newDist = getDist(event.touches);
                const delta = newDist - pinchDist.current;
                setItemSize(prevSize => {
                    const newSize = prevSize + delta * 0.5;
                    return Math.max(MIN_ITEM_SIZE, Math.min(MAX_ITEM_SIZE, newSize));
                });
                pinchDist.current = newDist;
            }
        };

        const handleTouchEnd = () => { pinchDist.current = 0; };
        
        if (!isAlbumMode) {
            container.addEventListener('wheel', handleWheel, { passive: false });
            container.addEventListener('touchstart', handleTouchStart, { passive: false });
            container.addEventListener('touchmove', handleTouchMove, { passive: false });
            container.addEventListener('touchend', handleTouchEnd);
            container.addEventListener('touchcancel', handleTouchEnd);
        }

        return () => {
            container.removeEventListener('wheel', handleWheel);
            container.removeEventListener('touchstart', handleTouchStart);
            container.removeEventListener('touchmove', handleTouchMove);
            container.removeEventListener('touchend', handleTouchEnd);
            container.removeEventListener('touchcancel', handleTouchEnd);
        };
    }, [isAlbumMode]);

    useEffect(() => {
        setSelectedVariants(new Set());
        setIsSelectMode(false);
    }, [mode, focusedProduct]);

    const handleToggleSelectMode = () => {
        if (isSelectMode) {
            setSelectedVariants(new Set());
        }
        setIsSelectMode(!isSelectMode);
    };

    const handleSelectVariant = (variantId) => {
        if (!isSelectMode) return;
        const newSelection = new Set(selectedVariants);
        if (newSelection.has(variantId)) {
            newSelection.delete(variantId);
        } else {
            newSelection.add(variantId);
        }
        setSelectedVariants(newSelection);
    };

    const handleShare = async () => {
        const selected = variants.filter((v) => selectedVariants.has(v.id));
        setItemsToShare(selected);
        setIsSharing(true);

        setTimeout(async () => {
            if (!shareRef.current) {
                setIsSharing(false);
                return;
            }
            try {
                const canvas = await html2canvas(shareRef.current, { useCORS: true, scale: 2 });
                // FIX: Specify the generic type for the Promise to ensure `blob` is correctly typed as `Blob | null`.
                const blob = await new Promise<Blob | null>(resolve => canvas.toBlob(resolve, 'image/png'));
                if (!blob) throw new Error('Blob creation failed');
                
                const file = new File([blob], 'selection.png', { type: 'image/png' });
                if (navigator.canShare && navigator.canShare({ files: [file] })) {
                    await navigator.share({ title: 'Product Selection', files: [file] });
                } else {
                     const dataUrl = URL.createObjectURL(blob);
                     const link = document.createElement('a');
                     link.href = dataUrl;
                     link.download = 'selection.png';
                     link.click();
                     URL.revokeObjectURL(dataUrl);
                }
            } catch (error: any) {
                 if (error.name !== 'AbortError') alert('Failed to share selection.');
            } finally {
                setIsSharing(false);
                setItemsToShare([]);
            }
        }, 100);
    };
    
    const renderContent = () => {
        if (isAlbumMode) {
            return productsInView.map(p => (
                <ProductAlbumCard 
                    key={p.product.id}
                    productGroup={p}
                    onClick={() => setFocusedProduct(p.product)}
                    t={t}
                    seriesNameToTemplateMap={seriesNameToTemplateMap}
                />
            ));
        }

        const displayedVariants = focusedProduct
            ? variants.filter((v) => v.product.id === focusedProduct.id)
            : variants;
            
        return displayedVariants.map((variant, index) => {
            return (
                <div
                    key={variant.id}
                    className={`gallery-item ${selectedVariants.has(variant.id) ? 'selected' : ''} ${!isSelectMode ? 'zoomable' : ''}`}
                    onClick={() => {
                        if (isSelectMode) {
                            handleSelectVariant(variant.id);
                        } else {
                            setViewerIndex(index);
                        }
                    }}
                >
                    <LazyImage 
                        src={variant.imageUrl} 
                        size={itemSize} 
                        alt={variant.colorName} 
                    />
                    {isSelectMode && (
                        <div className="selection-circle">
                             {selectedVariants.has(variant.id) && <CheckIcon />}
                        </div>
                    )}
                    <div className="gallery-item-info"><span>{`${variant.product.name} - ${variant.colorName}`}</span></div>
                </div>
            );
        });
    };

    const gridStyles = isAlbumMode
        ? { gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }
        : { gridTemplateColumns: `repeat(auto-fill, minmax(${itemSize}px, 1fr))` };

    const displayedVariantsForViewer = useMemo(() => {
        return focusedProduct ? variants.filter((v) => v.product.id === focusedProduct.id) : variants;
    }, [variants, focusedProduct]);

    return (
        <div className={`gallery-view-wrapper ${isSelectMode ? 'select-mode-active' : ''}`}>
             <div className="gallery-header">
                <button className="btn-secondary filter-toggle-btn" onClick={onOpenFilters}>
                    <span>{t.filters}</span>
                </button>
                <div className="gallery-view-mode-toggle">
                  {focusedProduct ? (
                      <button className="btn-secondary" onClick={() => setFocusedProduct(null)}>
                          {t.backToAlbums}
                      </button>
                  ) : (
                      <button className="btn-secondary" onClick={() => setMode((m) => m === 'albums' ? 'variants' : 'albums')}>
                          {mode === 'albums' ? t.allItems : t.albums}
                      </button>
                  )}
                </div>
                <button className="btn-secondary select-toggle-btn" onClick={handleToggleSelectMode} disabled={isAlbumMode}>
                    {isSelectMode ? t.cancel : t.select}
                </button>
            </div>
            <div
                ref={containerRef}
                className="gallery-view-container"
                style={gridStyles}
            >
                {renderContent()}
            </div>
            {selectedVariants.size > 0 && (
                <div className="floating-action-bar">
                    <button onClick={handleShare} disabled={isSharing} title={isSharing ? t.sharingOrder : t.shareSelected}>
                       <ShareIcon />
                    </button>
                    <span className="selection-count">{t.itemsSelected.replace('{count}', String(selectedVariants.size))}</span>
                    <button onClick={() => setIsBulkModalOpen(true)} title={t.bulkAddToCart}>
                       <CartPlusIcon />
                    </button>
                </div>
            )}
            <BulkAddToCartModal
                isOpen={isBulkModalOpen}
                onClose={() => setIsBulkModalOpen(false)}
                selectedVariants={variants.filter((v) => selectedVariants.has(v.id))}
                onConfirm={(items) => {
                    onBulkAddToCart(items);
                    setIsBulkModalOpen(false);
                    setSelectedVariants(new Set());
                    setIsSelectMode(false);
                }}
                t={t}
            />
            {itemsToShare.length > 0 && (
                 <div id="share-selection-container" ref={shareRef as React.RefObject<HTMLDivElement>}>
                    {itemsToShare.map((item) => (
                        <div key={item.id} className="share-selection-item">
                            <img src={getTransformedImageUrl(item.imageUrl, {width: 200, height: 200})} alt={item.colorName} crossOrigin="anonymous" />
                            <p>{item.product.name}</p>
                            <p>{`${item.colorName} - ${item.product.code}`}</p>
                        </div>
                    ))}
                </div>
            )}
            {viewerIndex !== null && <ImageViewer
                images={displayedVariantsForViewer}
                currentIndex={viewerIndex}
                onClose={() => setViewerIndex(null)}
                t={t}
                onSelectOptions={onSelectOptions}
            />}
            <div className="mobile-gallery-footer">
                <p>{storeSettings.name}</p>
                <p>{`© ${new Date().getFullYear()} ${storeSettings.brand || ''}. ${t.allRightsReserved}`}</p>
            </div>
        </div>
    );
};


// --- SHORTS PLAYER ---
const ShortsVideoItem = ({ item, isActive }) => {
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(true);
    const [currentVideo, setCurrentVideo] = useState({
        url: item.mainVideoUrl,
        variant: null
    });

    // Effect to control playback when this item becomes active/inactive
    useEffect(() => {
        if (isActive) {
            videoRef.current?.play().catch(e => { });
            setIsPlaying(true);
        } else {
            if (videoRef.current) {
                videoRef.current.pause();
                videoRef.current.currentTime = 0;
            }
            // Reset to main video when scrolling away
            setCurrentVideo({ url: item.mainVideoUrl, variant: null });
            setIsPlaying(false);
        }
    }, [isActive, item.mainVideoUrl]);

    // Effect to play video when source changes (e.g., clicking a swatch)
    useEffect(() => {
        if (isActive && videoRef.current) {
            videoRef.current.play().catch(e => { });
            setIsPlaying(true);
        }
    }, [currentVideo.url, isActive]);

    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };
    
    const toggleMute = (e) => {
        e.stopPropagation();
        setIsMuted(prev => !prev);
    };

    const handleSwatchClick = (variant) => {
        // If clicking the currently active variant, revert to main video
        if (currentVideo.variant && currentVideo.variant.id === variant.id) {
            setCurrentVideo({ url: item.mainVideoUrl, variant: null });
        } else {
            setCurrentVideo({ url: variant.video_url, variant: variant });
        }
    };

    const activeVariant = currentVideo.variant;

    return <div className='shorts-video-item'>
        <video
            ref={videoRef}
            key={currentVideo.url} // Force re-render on source change
            className='shorts-video-element'
            src={currentVideo.url}
            loop
            playsInline
            muted={isMuted}
            data-product-id={item.product.id}
        />
        <div className='shorts-video-overlay' onClick={togglePlay}>
            <div>
                <div className='shorts-video-info-wrapper'>
                    {(activeVariant && activeVariant.colorCode) && <div
                        className='current-variant-color'
                        style={{ backgroundColor: activeVariant.colorCode }}
                    />}
                    <div className='shorts-video-info'>
                        <h3>{item.product.name}</h3>
                        <p>{`${item.product.code} ${activeVariant ? `- ${activeVariant.colorName}` : ''}`}</p>
                    </div>
                </div>
                {item.videoVariants.length > 0 && <div className='shorts-variant-selector'>
                    {item.videoVariants.map(variant =>
                        <div
                            key={variant.id}
                            className={`variant-swatch ${activeVariant && activeVariant.id === variant.id ? 'active' : ''}`}
                            style={{ backgroundColor: variant.colorCode }}
                            title={variant.colorName}
                            onClick={(e) => {
                                e.stopPropagation();
                                handleSwatchClick(variant);
                            }}
                        />
                    )}
                </div>}
            </div>
        </div>
        <div className='shorts-video-controls'>
            <button onClick={toggleMute} aria-label={isMuted ? "Unmute" : "Mute"}>
                {isMuted ? <VolumeOffIcon /> : <VolumeOnIcon />}
            </button>
        </div>
    </div>;
};

const ShortsPlayer = ({ isOpen, shortsItems, activeShortId, onClose }) => {
    const containerRef = useRef(null);
    const [intersectingId, setIntersectingId] = useState(activeShortId);

    const mainVideosOnly = useMemo(() => {
        return shortsItems.filter(item => item.mainVideoUrl);
    }, [shortsItems]);

    useEffect(() => {
        if (isOpen && activeShortId) {
            const activeEl = document.querySelector(`[data-product-id="${activeShortId}"]`);
            activeEl?.closest('.shorts-video-item').scrollIntoView({ behavior: 'instant', block: 'start' });
            setIntersectingId(activeShortId);
        }
    }, [activeShortId, isOpen, mainVideosOnly]);

    useEffect(() => {
        if (!isOpen) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const productId = entry.target.querySelector('video')?.dataset.productId;
                        if (productId) {
                            setIntersectingId(productId);
                        }
                    }
                });
            },
            { threshold: 0.7 }
        );

        const items = containerRef.current?.querySelectorAll('.shorts-video-item');
        if (items) {
            items.forEach(item => observer.observe(item));
        }

        return () => observer.disconnect();
    }, [isOpen, mainVideosOnly]);

    if (!isOpen || !mainVideosOnly || mainVideosOnly.length === 0) return null;

    return <div className='shorts-player-overlay'>
        <button className='shorts-player-close-btn' onClick={onClose}><XIcon/></button>
        <div className='shorts-player-container' ref={containerRef}>
            {mainVideosOnly.map(item =>
                <ShortsVideoItem
                    key={item.product.id}
                    item={item}
                    isActive={item.product.id === intersectingId}
                />
            )}
        </div>
    </div>;
};

// --- ADD TO HOME SCREEN BANNER ---
const AddToHomeScreenBanner = ({ onInstall, onDismiss, storeSettings, t }) => {
    return (
        <div className="add-to-home-screen-banner">
            <button className="a2hs-dismiss-btn" onClick={onDismiss} aria-label="Dismiss">×</button>
            <img src={storeSettings.logo || "/icon-192x192.png"} alt="App Icon" className="a2hs-logo" />
            <div className="a2hs-text">
                <strong>{t.a2hsTitle.replace('{appName}', storeSettings.name)}</strong>
                <span>{t.a2hsDescription}</span>
            </div>
            <button className="a2hs-install-btn" onClick={onInstall}>{t.a2hsInstall}</button>
        </div>
    );
};

const IosInstallBanner = ({ onDismiss, storeSettings, t }) => {
    return (
        <div className="add-to-home-screen-banner">
            <button className="a2hs-dismiss-btn" onClick={onDismiss} aria-label={t.close}>×</button>
            <ShareIconIos />
            <div className="a2hs-text" style={{ marginRight: 0 }}>
                <strong>{t.a2hsTitle.replace('{appName}', storeSettings.name)}</strong>
                <span>{t.a2hsIosInstruction}</span>
            </div>
        </div>
    );
};


// --- MAIN APP COMPONENT ---
const App = () => {
  const [products, setProducts] = useState([]);
  const [seriesTemplates, setSeriesTemplates] = useState([]);
  const [collarTypes, setCollarTypes] = useState([]);
  const [contentTemplates, setContentTemplates] = useState([]);
  const [genderTemplates, setGenderTemplates] = useState([]);
  const [defaultStoreSettings, setDefaultStoreSettings] = useState({ name: "CAPORİCCO", logo: null, brand: 'CAPORİCCO', manufacturer_title: '', origin: '', name_color: '#192A56' });
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [language, setLanguage] = useState(
    () => (localStorage.getItem('appLanguage')) || 'en'
  );
  const [cartItems, setCartItems] = useState(() => {
    try {
      const savedCart = localStorage.getItem('cartItems');
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        if (Array.isArray(parsedCart)) {
          return parsedCart.map((item) => {
            if (item && item.series && typeof item.series.id !== 'string') {
              item.series.id = String(item.series.id);
            }
            return item;
          });
        }
      }
      return [];
    } catch (error) {
      console.error("Failed to parse cart items from localStorage", error);
      return [];
    }
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [isAdminView, setIsAdminView] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const [isDownloadingExcel, setIsDownloadingExcel] = useState(false);
  const [layout, setLayout] = useState('double');
  const [installPrompt, setInstallPrompt] = useState(null);
  const [isA2hsBannerVisible, setIsA2hsBannerVisible] = useState(false);
  const [showIosInstallHelp, setShowIosInstallHelp] = useState(false);
  useEffect(() => {
    setLayout(window.innerWidth <= 768 ? 'gallery' : 'double');
  }, []);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState({ seasons: [], collarTypes: [], seriesNames: [], genders: [], discounted: false });
  const [isMobileSearchVisible, setIsMobileSearchVisible] = useState(false);
  const [isShortsPlayerOpen, setIsShortsPlayerOpen] = useState(false);
  const [activeShortId, setActiveShortId] = useState(null);
  const [adminActiveTab, setAdminActiveTab] = useState('products');
  const shareImageRef = useRef(null);

  // --- New Auth State ---
  const [userSession, setUserSession] = useState(null);
  const [currentStore, setCurrentStore] = useState(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const isNewProduct = (createdAt) => {
    if (!createdAt) return false;
    const productDate = new Date(createdAt);
    const now = new Date();
    const oneWeek = 7 * 24 * 60 * 60 * 1000;
    return (now.getTime() - productDate.getTime()) < oneWeek;
  };
  
  const fetchData = useCallback(async ({ storeId = null, publicView = false, preventLoader = false } = {}) => {
      if (!preventLoader) setLoading(true);
      try {
          let productsQuery = db.from('products').select('*, variants(*, series(*))');
          
          let targetStoreId = storeId;
          
          // For public view, determine store from subdomain
          if (publicView && !targetStoreId) {
             const hostname = window.location.hostname;
             const parts = hostname.split('.');
             const subdomain = (parts.length > 2 && parts[0] !== 'www') ? parts[0] : null;

             if (subdomain) {
                const { data: storeData } = await db.from('stores').select('*').eq('subdomain', subdomain).single();
                if (storeData) {
                    targetStoreId = storeData.id;
                    setDefaultStoreSettings({
                        ...storeData,
                        nameColor: storeData.name_color,
                        manufacturerTitle: storeData.manufacturer_title,
                    });
                }
             }
          }
          
          if (targetStoreId) {
              productsQuery = productsQuery.eq('store_id', targetStoreId);
          } else if (!publicView) {
              setProducts([]);
          }
          
          if(targetStoreId || publicView) {
            const { data: productsData, error: productsError } = await productsQuery.order('created_at', { ascending: false });
            if (productsError) throw productsError;
            
            const formattedProducts = productsData.map((p) => ({
                ...p,
                id: String(p.id),
                video_url: p.video_url,
                season: p.season,
                collarType: p.collar_type,
                content: p.content,
                gender: p.gender,
                discountPercentage: p.discount_percentage,
                created_at: p.created_at,
                variants: (p.variants || []).map((v) => ({
                    ...v,
                    id: String(v.id),
                    colorName: v.color_name,
                    colorCode: v.color_code,
                    imageUrl: v.image_url,
                    video_url: v.video_url,
                    series: (v.series || []).map((s) => ({ ...s, id: String(s.id) }))
                }))
            }));
            setProducts(formattedProducts);
          }

          // Fetch global templates
          const { data: templatesData, error: templatesError } = await db.from('series_templates').select('*');
          if (templatesError) throw templatesError;
          const formattedTemplates = templatesData.map((t) => ({...t, id: String(t.id), name: String(t.name || ''), seriesNames: (t.series_names || []).map(String)}));
          setSeriesTemplates(formattedTemplates);
          
          const { data: collarTypesData, error: collarTypesError } = await db.from('collar_types').select('*').order('name');
          if (collarTypesError) console.warn("Could not fetch collar types.", collarTypesError);
          else setCollarTypes((collarTypesData || []).map((ct) => ({ ...ct, id: String(ct.id), name: String(ct.name || '') })));

          const { data: contentTemplatesData, error: contentTemplatesError } = await db.from('content_templates').select('*').order('name');
          if (contentTemplatesError) console.warn("Could not fetch content templates.", contentTemplatesError);
          else setContentTemplates((contentTemplatesData || []).map((ct) => ({ ...ct, id: String(ct.id), name: String(ct.name || '') })));

          const { data: genderTemplatesData, error: genderTemplatesError } = await db.from('gender_templates').select('*').order('name');
          if (genderTemplatesError) console.warn("Could not fetch gender templates.", genderTemplatesError);
          else setGenderTemplates((genderTemplatesData || []).map((gt) => ({ ...gt, id: String(gt.id), name: String(gt.name || '') })));

      } catch (error) {
          console.error("Error fetching data:", error);
      } finally {
          if (!preventLoader) setLoading(false);
      }
  }, []);

  useEffect(() => {
    const { data: { subscription } } = db.auth.onAuthStateChange(async (event, session) => {
      setUserSession(session);
      if (session?.user) {
        const { data: storeData } = await db.from('stores').select('*').eq('owner_id', session.user.id).single();
        if (storeData) {
            setCurrentStore(storeData);
            setIsAdminView(true);
            fetchData({ storeId: storeData.id });
        } else {
             if(event === 'SIGNED_IN') {
                console.error("User is logged in but has no associated store. Logging out.");
                await db.auth.signOut();
             }
        }
        setIsAuthModalOpen(false);
      } else {
        setCurrentStore(null);
        setIsAdminView(false);
        fetchData({ publicView: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [fetchData]);

  
  useEffect(() => {
      try {
          localStorage.setItem('cartItems', JSON.stringify(cartItems));
      } catch (error) {
          console.error("Could not save cart to localStorage", error);
      }
  }, [cartItems]);
  
  useEffect(() => {
    localStorage.setItem('appLanguage', language);
  }, [language]);
  
   useEffect(() => {
        const isMobile = window.innerWidth <= 768;
        if (isMobile && layout === 'gallery') {
            document.body.classList.add('gallery-view-mobile');
        } else {
            document.body.classList.remove('gallery-view-mobile');
        }
        
        return () => {
             document.body.classList.remove('gallery-view-mobile');
        };
    }, [layout]);
    
  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setInstallPrompt(e);

      const dismissedAt = localStorage.getItem('a2hsDismissed');
      if (dismissedAt) {
          const dismissedTimestamp = parseInt(dismissedAt, 10);
          const threeHoursInMillis = 3 * 60 * 60 * 1000;
          if (!isNaN(dismissedTimestamp) && (Date.now() - dismissedTimestamp > threeHoursInMillis)) {
              setIsA2hsBannerVisible(true);
          }
      } else {
          setIsA2hsBannerVisible(true);
      }
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  useEffect(() => {
    // FIX: Add `as any` to window to access non-standard `MSStream` property.
    const isIos = () => /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone === true;

    if (isIos() && !isStandalone) {
      const dismissedAt = localStorage.getItem('iosA2hsDismissed');
      let shouldShow = false;
      if (dismissedAt) {
          const dismissedTimestamp = parseInt(dismissedAt, 10);
          const threeHoursInMillis = 3 * 60 * 60 * 1000;
          if (!isNaN(dismissedTimestamp) && (Date.now() - dismissedTimestamp > threeHoursInMillis)) {
              shouldShow = true;
          }
      } else {
          shouldShow = true;
      }
      
      if (shouldShow) {
          const timer = setTimeout(() => {
              setShowIosInstallHelp(true);
          }, 3000);
          return () => clearTimeout(timer);
      }
    }
  }, []);

  const handleInstallClick = () => {
      if (!installPrompt) return;
      (installPrompt as any).prompt();
      (installPrompt as any).userChoice.then((choiceResult) => {
          if (choiceResult.outcome === 'accepted') {
              console.log('User accepted the A2HS prompt');
          } else {
              console.log('User dismissed the A2HS prompt');
          }
          setIsA2hsBannerVisible(false);
          setInstallPrompt(null);
      });
  };

  const handleDismissBanner = () => {
      localStorage.setItem('a2hsDismissed', Date.now().toString());
      setIsA2hsBannerVisible(false);
  };
  
  const handleIosDismiss = () => {
    localStorage.setItem('iosA2hsDismissed', Date.now().toString());
    setShowIosInstallHelp(false);
  };

  const t = useMemo(() => translations[language], [language]);
  
  const seriesNameToTemplateMap = useMemo(() => {
      const map = new Map();
      seriesTemplates.forEach(template => {
          template.seriesNames.forEach(name => {
              if (!map.has(name)) {
                  map.set(name, template.name);
              }
          });
      });
      return map;
  }, [seriesTemplates]);
  
  const filteredProducts = useMemo(() => {
    // FIX: Convert boolean result of `isNewProduct` to a number for sorting.
    const sortedProducts = [...products].sort((a, b) => Number(isNewProduct(b.created_at)) - Number(isNewProduct(a.created_at)));

    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    
    let productsToFilter = sortedProducts;
    
    if (lowerCaseSearchTerm) {
         productsToFilter = productsToFilter.filter((product) =>
            product.name.toLowerCase().includes(lowerCaseSearchTerm) ||
            product.code.toLowerCase().includes(lowerCaseSearchTerm)
        );
    }
    
    const hasActiveFilters = Object.values(activeFilters).some(arr => Array.isArray(arr) && arr.length > 0) || activeFilters.discounted;

    if (!hasActiveFilters) {
      return productsToFilter;
    }

    return productsToFilter.filter(product => {
      const seasonMatch = activeFilters.seasons.length === 0 || activeFilters.seasons.includes(product.season);
      const collarMatch = activeFilters.collarTypes.length === 0 || activeFilters.collarTypes.includes(product.collarType);
      const genderMatch = activeFilters.genders.length === 0 || activeFilters.genders.includes(product.gender);
      const discountMatch = !activeFilters.discounted || (product.discountPercentage && product.discountPercentage > 0);

      const seriesMatch = activeFilters.seriesNames.length === 0 || product.variants.some(v =>
        v.series.some(s => activeFilters.seriesNames.includes(s.name))
      );

      return seasonMatch && collarMatch && seriesMatch && genderMatch && discountMatch;
    });
  }, [products, searchTerm, activeFilters]);

    const filteredVariantsForGallery = useMemo(() => {
        return filteredProducts.flatMap(p => p.variants.map(v => ({ ...v, product: p })));
    }, [filteredProducts]);
    
    const cartStats = useMemo(() => {
        let totalPacks = 0;
        let totalUnits = 0;
        
        cartItems.forEach(item => {
            const quantity = Number(item.quantity || 0);
            totalPacks += quantity;
            totalUnits += getUnitsPerSeries(item.series.name) * quantity;
        });

        return {
            totalItemTypes: cartItems.length,
            totalPacks,
            totalUnits,
        };
    }, [cartItems]);
    
    const shortsItems = useMemo(() => {
        return products.map(p => ({
            product: p,
            mainVideoUrl: p.video_url,
            videoVariants: p.variants.filter(v => v.video_url)
        })).filter(item => item.mainVideoUrl || item.videoVariants.length > 0);
    }, [products]);

    const handleBulkAddToCart = (items) => {
        setCartItems(prevCartItems => {
            const newCartItems = [...prevCartItems];
            
            items.forEach(itemToAdd => {
                const existingItemIndex = newCartItems.findIndex(item => item.series.id === itemToAdd.series.id);
                if (existingItemIndex > -1) {
                    newCartItems[existingItemIndex].quantity = Number(newCartItems[existingItemIndex].quantity || 0) + itemToAdd.quantity;
                } else {
                     newCartItems.push({
                         productName: itemToAdd.product.name,
                         productCode: itemToAdd.product.code,
                         discountPercentage: itemToAdd.product.discountPercentage || 0,
                         variant: { id: itemToAdd.variant.id, colorName: itemToAdd.variant.colorName, imageUrl: itemToAdd.variant.imageUrl },
                         series: itemToAdd.series,
                         quantity: itemToAdd.quantity
                     });
                }
            });
            
            return newCartItems;
        });
    };

  const handleRemoveFromCart = (seriesId) => {
    setCartItems(prevItems => prevItems.filter(item => item.series.id !== seriesId));
  };

  const handleUpdateQuantity = (seriesId, quantity) => {
    setCartItems(prevItems => {
        if (quantity <= 0) {
            return prevItems.filter(item => item.series.id !== seriesId);
        }
        return prevItems.map(item =>
            item.series.id === seriesId ? { ...item, quantity: String(quantity) } : item
        );
    });
  };

  const handleOpenModal = (product, variant) => {
    setModalData({ product, variant });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => setIsModalOpen(false);
  
  const handleLanguageChange = (e) => setLanguage(e.target.value);
  
  const handleAuthAction = () => {
    if (userSession) {
      setIsAdminView(prev => !prev);
    } else {
      setIsAuthModalOpen(true);
    }
  };
  
  const handleLogout = async () => {
    await db.auth.signOut();
  };


  const handleLayoutToggle = () => {
    if (!isAdminView) {
        setLayout(prevLayout => (prevLayout === 'double' ? 'gallery' : 'double'));
    } else {
        handleAuthAction();
    }
  };

    const handleShareOrder = async () => {
        setIsSharing(true);
        try {
            const totals = cartItems.reduce((acc, item) => {
              const { currency, price } = item.series;
              const discount = item.discountPercentage || 0;
              const discountedPrice = price * (1 - (discount / 100));
              const quantity = Number(item.quantity || 0);
              if (!acc[currency]) acc[currency] = 0;
              acc[currency] += discountedPrice * quantity;
              return acc;
            }, {});
            
            const tempDiv = document.createElement('div');
            document.body.appendChild(tempDiv);
            
            const element = <OrderShareImage
              ref={shareImageRef}
              cartItems={cartItems}
              totals={totals}
              t={t}
              storeSettings={displaySettings}
              cartStats={cartStats}
            />;

            const root = createRoot(tempDiv);
            
            await new Promise(resolve => {
                root.render(element);
                setTimeout(resolve, 500);
            });
            
            if (shareImageRef.current) {
                const canvas = await html2canvas(shareImageRef.current, { useCORS: true, scale: 2 });
                // FIX: Specify the generic type for the Promise to ensure `blob` is correctly typed as `Blob | null`.
                const blob = await new Promise<Blob | null>(resolve => canvas.toBlob(resolve, 'image/jpeg', 0.9));
                
                if (navigator.share && blob) {
                   const file = new File([blob], 'order.jpg', { type: 'image/jpeg' });
                   try {
                     await navigator.share({
                        title: `${displaySettings.name} Order`,
                        files: [file],
                     });
                   } catch (error: any) {
                       if (error.name !== 'AbortError') throw error;
                   }
                } else {
                   const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
                   const link = document.createElement('a');
                   link.href = dataUrl;
                   link.download = 'order.jpg';
                   link.click();
                }
            }
            
            root.unmount();
            document.body.removeChild(tempDiv);
        } catch (error) {
            console.error('Sharing failed:', error);
            alert('Could not share order.');
        } finally {
            setIsSharing(false);
        }
    };
    
    const handleDownloadExcel = async () => {
        setIsDownloadingExcel(true);
        try {
            const wb = XLSX.utils.book_new();
            
            // FIX: Type the accumulator of reduce to `any` to allow dynamic property access.
            const groupedByProduct = cartItems.reduce((acc: { [key: string]: any }, item) => {
                const key = `${item.productCode} - ${item.variant.colorName}`;
                if (!acc[key]) {
                    acc[key] = {
                        productCode: item.productCode,
                        productName: item.productName,
                        color: item.variant.colorName,
                        imageUrl: item.variant.imageUrl,
                        series: []
                    };
                }
                const units = getUnitsPerSeries(item.series.name);
                const unitPrice = units > 0 ? item.series.price / units : item.series.price;
                
                acc[key].series.push({
                    seriesName: item.series.name,
                    quantity: Number(item.quantity),
                    totalUnits: Number(item.quantity) * units,
                    unitPrice: unitPrice,
                    totalPrice: Number(item.quantity) * item.series.price,
                    currency: item.series.currency
                });
                return acc;
            }, {});

            const data = Object.values(groupedByProduct).flatMap(group =>
                group.series.map(s => ({
                    [t.productCode]: group.productCode,
                    [t.productName]: group.productName,
                    [t.colorName]: group.color,
                    [t.seriesName]: s.seriesName,
                    [t.totalPacks]: s.quantity,
                    [t.totalUnits]: s.totalUnits,
                    [t.unitPrice]: s.unitPrice,
                    [t.total]: s.totalPrice,
                    [t.currency]: s.currency,
                }))
            );
            
            const ws = XLSX.utils.json_to_sheet(data);
            XLSX.utils.book_append_sheet(wb, ws, "Order");

            XLSX.writeFile(wb, `${displaySettings.name}_Order_${new Date().toLocaleDateString()}.xlsx`);

        } catch (error) {
            console.error("Failed to generate Excel file:", error);
            alert("Could not generate Excel file.");
        } finally {
            setIsDownloadingExcel(false);
        }
    };

    const handleLayoutChange = (newLayout) => {
        setLayout(newLayout);
    };
    
    const handleOpenShortsPlayer = (productId = null) => {
        setActiveShortId(productId || shortsItems[0]?.product.id);
        setIsShortsPlayerOpen(true);
    };
    
    const displaySettings = (isAdminView && currentStore) ? currentStore : defaultStoreSettings;

  if (loading) {
    return <div className="loader">Loading...</div>;
  }

  return (
    <>
      <header className="app-header">
        <div className="container">
          <div className="header-content">
            <div className="store-info">
                {displaySettings.logo && <img src={displaySettings.logo} alt="Store Logo" className="store-logo-img" onClick={handleAuthAction} />}
                <h1 className="store-logo" onClick={handleLayoutToggle}>{displaySettings.name}</h1>
                <h1 className="store-name-mobile-gallery" onClick={() => window.location.reload()} style={{ color: displaySettings.name_color || '#192A56' }}>{displaySettings.name}</h1>
            </div>
            {!isAdminView && (
                <div className={`search-bar desktop-search-bar ${isMobileSearchVisible ? 'mobile-search-bar-active' : ''}`}>
                    {isMobileSearchVisible && <button className="mobile-search-back-btn" onClick={() => setIsMobileSearchVisible(false)}><ArrowLeftIcon /></button>}
                    <div className="search-input-wrapper">
                        <SearchIcon className="search-icon" />
                        <input
                            type="text"
                            placeholder={t.searchPlaceholder}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
            )}
            <div className="header-controls">
              {!isAdminView && (
                  <>
                    <button className="mobile-search-toggle" onClick={() => setIsMobileSearchVisible(true)}><SearchIcon /></button>
                    {shortsItems.length > 0 && <button className="btn-secondary shorts-toggle-btn" onClick={() => handleOpenShortsPlayer()}><VideoIcon /></button>}
                    <div className="view-toggle">
                        <button className={layout === 'double' ? 'active' : ''} onClick={() => handleLayoutChange('double')} title="Double Grid"><ViewGridIcon /></button>
                        <button className={layout === 'gallery' ? 'active' : ''} onClick={() => handleLayoutChange('gallery')} title={t.galleryView}><ViewGalleryIcon /></button>
                    </div>
                  </>
              )}
              <div className="language-switcher">
                <select value={language} onChange={handleLanguageChange}>
                  <option value="en">EN</option>
                  <option value="tr">TR</option>
                  <option value="ru">RU</option>
                </select>
              </div>
              {!isAdminView && (
                <button className="cart-button" onClick={() => setIsCartOpen(true)}>
                    <CartIcon />
                    <span>{t.cart}</span>
                    {cartItems.length > 0 && <span className="cart-count">{cartItems.length}</span>}
                </button>
              )}
            </div>
          </div>
        </div>
      </header>
      <main>
        <div className="container">
          {isAdminView && currentStore ? (
            <AdminPanel 
                products={products} 
                seriesTemplates={seriesTemplates} 
                storeSettings={currentStore}
                collarTypes={collarTypes}
                contentTemplates={contentTemplates}
                genderTemplates={genderTemplates}
                onFetchData={fetchData}
                t={t}
                activeTab={adminActiveTab}
                onActiveTabChange={setAdminActiveTab}
                onExit={() => setIsAdminView(false)}
                onLogout={handleLogout}
             />
          ) : (
            layout === 'gallery' ? (
                 <GalleryView
                    variants={filteredVariantsForGallery}
                    onBulkAddToCart={handleBulkAddToCart}
                    onOpenFilters={() => setIsFilterOpen(true)}
                    t={t}
                    activeFilters={activeFilters}
                    seriesNameToTemplateMap={seriesNameToTemplateMap}
                    storeSettings={displaySettings}
                    onSelectOptions={(product, variant) => handleOpenModal(product, variant)}
                />
            ) : (
                <div className={`product-grid layout-${layout}`}>
                    {filteredProducts.map(product =>
                        <ProductCard
                            key={product.id}
                            product={product}
                            onSelectOptions={(p, v) => handleOpenModal(p, v)}
                            t={t}
                        />
                    )}
                </div>
            )
          )}
        </div>
      </main>
      <SeriesSelectionModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        productInfo={modalData?.product}
        productVariant={modalData?.variant}
        onBulkAddToCart={handleBulkAddToCart}
        t={t}
      />
      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onRemoveItem={handleRemoveFromCart}
        onUpdateQuantity={handleUpdateQuantity}
        onShareOrder={handleShareOrder}
        isSharing={isSharing}
        cartStats={cartStats}
        t={t}
        onDownloadExcel={handleDownloadExcel}
        isDownloadingExcel={isDownloadingExcel}
      />
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        t={t}
      />
      <FilterSidebar
          isOpen={isFilterOpen}
          onClose={() => setIsFilterOpen(false)}
          products={products}
          activeFilters={activeFilters}
          setActiveFilters={setActiveFilters}
          t={t}
      />
      <ShortsPlayer
          isOpen={isShortsPlayerOpen}
          shortsItems={shortsItems}
          activeShortId={activeShortId}
          onClose={() => setIsShortsPlayerOpen(false)}
      />
      {isA2hsBannerVisible && installPrompt && <AddToHomeScreenBanner
          onInstall={handleInstallClick}
          onDismiss={handleDismissBanner}
          storeSettings={displaySettings}
          t={t}
      />}
      {showIosInstallHelp && <IosInstallBanner
          onDismiss={handleIosDismiss}
          storeSettings={displaySettings}
          t={t}
      />}
    </>
  );
};

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(<App />);
