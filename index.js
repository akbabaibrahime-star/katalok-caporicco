
import React, { useState, useMemo, useRef, forwardRef, useEffect, useCallback } from 'react';
import { createRoot } from 'react-dom/client';

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
  },
};

// --- HELPER COMPONENTS & UTILS ---
const getTransformedImageUrl = (
  originalUrl,
  options
) => {
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


const SearchIcon = () => React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, React.createElement("circle", { cx: "11", cy: "11", r: "8" }), React.createElement("line", { x1: "21", y1: "21", x2: "16.65", y2: "16.65" }));
const CartIcon = () => React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, React.createElement("circle", { cx: "9", cy: "21", r: "1" }), React.createElement("circle", { cx: "20", cy: "21", r: "1" }), React.createElement("path", { d: "M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" }));
const PlusIcon = () => React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round" }, React.createElement("line", { x1: "12", y1: "5", x2: "12", y2: "19" }), React.createElement("line", { x1: "5", y1: "12", x2: "19", y2: "12" }));
const MinusIcon = () => React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round" }, React.createElement("line", { x1: "5", y1: "12", x2: "19", y2: "12" }));
const Trash2Icon = () => React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, React.createElement("polyline", { points: "3 6 5 6 21 6" }), React.createElement("path", { d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" }), React.createElement("line", { x1: "10", y1: "11", x2: "10", y2: "17" }), React.createElement("line", { x1: "14", y1: "11", x2: "14", y2: "17" }));
const CopyIcon = () => React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, React.createElement("rect", { x: "9", y: "9", width: "13", height: "13", rx: "2", ry: "2" }), React.createElement("path", { d: "M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" }));
const ViewListIcon = () => React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, React.createElement("path", { d: "M8 6h13" }), React.createElement("path", { d: "M8 12h13" }), React.createElement("path", { d: "M8 18h13" }), React.createElement("path", { d: "M3 6h.01" }), React.createElement("path", { d: "M3 12h.01" }), React.createElement("path", { d: "M3 18h.01" }));
const ViewGridIcon = () => React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, React.createElement("rect", { x: "3", y: "3", width: "7", height: "7" }), React.createElement("rect", { x: "14", y: "3", width: "7", height: "7" }), React.createElement("rect", { x: "14", y: "14", width: "7", height: "7" }), React.createElement("rect", { x: "3", y: "14", width: "7", height: "7" }));
const ViewGalleryIcon = () => React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, React.createElement("rect", { x: "3", y: "3", width: "18", height: "18", rx: "2", ry: "2" }), React.createElement("path", { d: "M3 9h18M9 21V9" }));
const FilterIcon = () => React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, React.createElement("polygon", { points: "22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" }));
const CheckIcon = () => React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: "10", height: "10", viewBox: "0 0 24 24", fill: "none", stroke: "white", strokeWidth: "3", strokeLinecap: "round", strokeLinejoin: "round" }, React.createElement("polyline", { points: "20 6 9 17 4 12" }));
const ShareIcon = () => React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: "22", height: "22", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, React.createElement("circle", { cx: "18", cy: "5", r: "3" }), React.createElement("circle", { cx: "6", cy: "12", r: "3" }), React.createElement("circle", { cx: "18", cy: "19", r: "3" }), React.createElement("line", { x1: "8.59", y1: "13.51", x2: "15.42", y2: "17.49" }), React.createElement("line", { x1: "15.41", y1: "6.51", x2: "8.59", y2: "10.49" }));
const CartPlusIcon = () => React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: "22", height: "22", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, React.createElement("circle", { cx: "9", cy: "21", r: "1" }), React.createElement("circle", { cx: "20", cy: "21", r: "1" }), React.createElement("path", { d: "M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" }), React.createElement("line", { x1: "12", y1: "9", x2: "12", y2: "15" }), React.createElement("line", { x1: "9", y1: "12", x2: "15", y2: "12" }));
const ChevronLeftIcon = () => React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: "32", height: "32", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, React.createElement("polyline", { points: "15 18 9 12 15 6" }));
const ChevronRightIcon = () => React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: "32", height: "32", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, React.createElement("polyline", { points: "9 18 15 12 9 6" }));
const XIcon = () => React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: "28", height: "28", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round" }, React.createElement("line", { x1: "18", y1: "6", x2: "6", y2: "18" }), React.createElement("line", { x1: "6", y1: "6", x2: "18", y2: "18" }));
const AdminIcon = () => React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: "22", height: "22", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, React.createElement("path", { d: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" }), React.createElement("circle", { cx: "12", cy: "7", r: "4" }));
const DownloadIcon = () => React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: "22", height: "22", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, React.createElement("path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }), React.createElement("polyline", { points: "7 10 12 15 17 10" }), React.createElement("line", { x1: "12", y1: "15", x2: "12", y2: "3" }));
const ArrowLeftIcon = () => React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, React.createElement("line", { x1: "19", y1: "12", x2: "5", y2: "12" }), React.createElement("polyline", { points: "12 19 5 12 12 5" }));
const VideoIcon = () => React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, React.createElement("path", { d: "m22 8-6 4 6 4V8Z" }), React.createElement("rect", { x: "2", y: "6", width: "14", height: "12", rx: "2", ry: "2" }));
const VolumeOnIcon = () => React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, React.createElement("polygon", { points: "11 5 6 9 2 9 2 15 6 15 11 19 11 5" }), React.createElement("path", { d: "M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" }));
const VolumeOffIcon = () => React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, React.createElement("polygon", { points: "11 5 6 9 2 9 2 15 6 15 11 19 11 5" }), React.createElement("line", { x1: "23", y1: "9", x2: "17", y2: "15" }), React.createElement("line", { x1: "17", y1: "9", x2: "23", y2: "15" }));
const ShareIconIos = () => React.createElement("svg", { style: { marginRight: '12px', flexShrink: 0 }, width: "32", height: "32", viewBox: "0 0 21 21", fill: "none", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }, React.createElement("path", { d: "M16.5 7.5l-5.964-5.964a.05.05 0 00-.071 0L4.5 7.5" }), React.createElement("path", { d: "M10.5 1.5v12" }), React.createElement("path", { d: "M7.5 6.5h-4a2 2 0 00-2 2v9a2 2 0 002 2h13a2 2 0 002-2v-9a2 2 0 00-2-2h-4" }));


const getTranslationKey = (str) => {
    if (!str) return '';
    return str.toLowerCase()
        .replace(/[\s-](.)/g, (_match, group1) => group1.toUpperCase())
        .replace(/[\s-]/g, '');
};

const formatCurrency = (amount, currency) => {
    const options = {
        'USD': { symbol: '$', format: (v) => `$${v.toFixed(2)}` },
        'EUR': { symbol: '€', format: (v) => `€${v.toFixed(2)}` },
        'TRY': { symbol: '₺', format: (v) => `₺${v.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` },
    };
    return options[currency]?.format(amount) || `${amount}`;
};

const getUnitsPerSeries = (seriesName) => {
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

const parseSeriesString = (seriesName) => {
    if (!seriesName) return [];

    const nameMatch = seriesName.match(/^([^(]+)/);
    const quantitiesMatch = seriesName.match(/\(([^)]+)\)/);

    if (!nameMatch) return [];

    const sizes = nameMatch[1].trim().split(/[\s,-]+/).filter(Boolean);
    let quantities = [];

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
        React.createElement("div", { className: "modal-overlay", onClick: onClose },
            React.createElement("div", { className: "modal-container", onClick: (e) => e.stopPropagation() },
                React.createElement("header", { className: "modal-header" },
                    React.createElement("div", null,
                        React.createElement("h3", null, productInfo.name),
                        React.createElement("p", null, `${productVariant.colorName} - ${productInfo.code}`)
                    ),
                    React.createElement("button", { className: "close-modal-btn", onClick: onClose, "aria-label": "Close modal" }, "×")
                ),
                React.createElement("div", { className: "modal-body" },
                    React.createElement("div", { className: "modal-series-selector" },
                        productVariant.series.map((series) => {
                            const units = getUnitsPerSeries(series.name);
                            const unitPrice = units > 1 ? series.price / units : null;
                            const hasDiscount = typeof productInfo.discountPercentage === 'number' && productInfo.discountPercentage > 0;
                            const discountedPrice = hasDiscount ? series.price * (1 - (productInfo.discountPercentage / 100)) : series.price;
                            const discountedUnitPrice = (unitPrice && hasDiscount) ? unitPrice * (1 - (productInfo.discountPercentage / 100)) : unitPrice;

                            return (
                                React.createElement("div", { key: series.id, className: "series-item" },
                                    React.createElement("div", { className: "series-info" },
                                        React.createElement("p", null, series.name),
                                        React.createElement("div", { className: "series-price" },
                                            hasDiscount && React.createElement("span", { className: "original-price" }, formatCurrency(series.price, series.currency)),
                                            React.createElement("span", { className: hasDiscount ? "discounted-price" : "" }, formatCurrency(discountedPrice, series.currency))
                                        ),
                                        unitPrice !== null && (
                                            React.createElement("p", { className: "series-unit-price" },
                                                "(",
                                                hasDiscount ? 
                                                    React.createElement(React.Fragment, null,
                                                        React.createElement("span", { className: "original-price" }, formatCurrency(unitPrice, series.currency)),
                                                        ' ',
                                                        React.createElement("span", null, formatCurrency(discountedUnitPrice, series.currency))
                                                    )
                                                : 
                                                    React.createElement("span", null, formatCurrency(unitPrice, series.currency)),
                                                ` ${t.perPiece})`
                                            )
                                        )
                                    ),
                                    React.createElement("div", { className: "add-to-cart-controls" },
                                        series.stock > 0 ? (
                                             React.createElement("div", { className: "quantity-stepper" },
                                                React.createElement("button", { onClick: () => handleQuantityStep(series.id, -1), disabled: (Number(quantities[series.id]) || 0) <= 0 }, "-"),
                                                React.createElement("input", {
                                                    type: "number",
                                                    min: "0",
                                                    max: series.stock,
                                                    value: quantities[series.id] || '',
                                                    placeholder: "0",
                                                    onChange: (e) => handleQuantityChange(series.id, e.target.value),
                                                    "aria-label": `Quantity for ${series.name}`
                                                }),
                                                React.createElement("button", { onClick: () => handleQuantityStep(series.id, 1), disabled: (Number(quantities[series.id]) || 0) >= series.stock }, "+")
                                            )
                                        ) : (
                                            React.createElement("span", { className: "out-of-stock-label" }, t.outOfStock)
                                        )
                                    )
                                )
                            );
                        })
                    )
                ),
                React.createElement("footer", { className: "modal-footer" },
                    React.createElement("button", { className: "btn-secondary", onClick: onClose }, t.cancel),
                    React.createElement("button", { className: "btn-primary", onClick: handleConfirmAddToCart, disabled: totalQuantity === 0 }, 
                        t.confirmAddToCart
                    )
                )
            )
        )
    );
};
// --- PRODUCT CARD COMPONENT ---
const ProductCard = ({ product, onSelectOptions, t }) => {
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);

  if (!selectedVariant) {
    return (
        React.createElement("div", { className: "product-card" },
            React.createElement("div", { className: "product-info" },
                React.createElement("h3", { className: "product-name" }, product.name),
                React.createElement("p", { className: "product-code" }, product.code),
                React.createElement("p", null, "No variants available.")
            )
        )
    );
  }
  
  const isVariantOutOfStock = useMemo(() => {
    if (!selectedVariant) return true;
    return selectedVariant.series.reduce((sum, s) => sum + s.stock, 0) <= 0;
  }, [selectedVariant]);
  

  return (
    React.createElement("div", { className: "product-card" },
      React.createElement("div", { className: "product-image-container" },
        React.createElement("img", { src: getTransformedImageUrl(selectedVariant.imageUrl, { width: 500, height: 500 }), alt: `${product.name} - ${selectedVariant.colorName}`, className: "product-image", crossOrigin: "anonymous" })
      ),
      React.createElement("div", { className: "product-info" },
        React.createElement("h3", { className: "product-name" }, product.name),
        React.createElement("p", { className: "product-code" }, product.code),
        React.createElement("div", { className: "color-selector" },
          React.createElement("div", { className: "color-swatches" },
            product.variants.map(variant => (
              React.createElement("div", {
                key: variant.id,
                className: `color-swatch ${selectedVariant.id === variant.id ? 'selected' : ''}`,
                style: { backgroundColor: variant.colorCode },
                onClick: () => setSelectedVariant(variant),
                title: variant.colorName,
                "aria-label": `Select color ${variant.colorName}`,
                role: "button",
                tabIndex: 0
              })
            ))
          )
        ),
        React.createElement("div", { className: "product-actions" },
           React.createElement("button", { 
                className: "select-options-btn", 
                onClick: () => onSelectOptions(product, selectedVariant),
                disabled: isVariantOutOfStock
            },
                isVariantOutOfStock ? t.outOfStock : t.selectOptions
           )
        )
      )
    )
  );
};

// --- CART COMPONENT ---
const CartSidebar = ({ isOpen, onClose, cartItems, onRemoveItem, onUpdateQuantity, onShareOrder, isSharing, cartStats, t, onDownloadExcel, isDownloadingExcel }) => {
    const totals = useMemo(() => {
        return cartItems.reduce((acc, item) => {
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
        React.createElement(React.Fragment, null,
          React.createElement("div", { className: `cart-overlay ${isOpen ? 'open' : ''}`, onClick: onClose }),
          React.createElement("aside", { className: `cart-sidebar ${isOpen ? 'open' : ''}`, role: "dialog", "aria-modal": "true", "aria-labelledby": "cart-heading" },
            React.createElement("header", { className: "cart-header" },
              React.createElement("h2", { id: "cart-heading" }, t.shoppingCart),
              React.createElement("button", { className: "close-cart-btn", onClick: onClose, "aria-label": "Close cart" }, "×")
            ),
            React.createElement("div", { className: "cart-body" },
              cartItems.length === 0 ? (
                React.createElement("p", { className: "cart-empty-message" }, t.emptyCart)
              ) : (
                cartItems.map((item, index) => {
                    const hasDiscount = typeof item.discountPercentage === 'number' && item.discountPercentage > 0;
                    const seriesPrice = item.series.price;
                    const discountedSeriesPrice = hasDiscount ? seriesPrice * (1 - (item.discountPercentage / 100)) : seriesPrice;

                    const units = getUnitsPerSeries(item.series.name);
                    const unitPrice = units > 1 ? seriesPrice / units : null;
                    const discountedUnitPrice = (unitPrice && hasDiscount) ? unitPrice * (1 - (item.discountPercentage / 100)) : unitPrice;

                    return (
                        React.createElement("div", { key: `${item.series.id}-${index}`, className: "cart-item" },
                            React.createElement("img", { src: getTransformedImageUrl(item.variant.imageUrl, { width: 160, height: 220 }), alt: item.variant.colorName, className: "cart-item-img", crossOrigin: "anonymous" }),
                            React.createElement("div", { className: "cart-item-details" },
                                React.createElement("div", { className: "cart-item-description" },
                                    React.createElement("p", null, 
                                        item.productName,
                                        hasDiscount && React.createElement("span", { className: "discount-tag", style: { marginLeft: '8px' } }, `%${item.discountPercentage}`)
                                    ),
                                    React.createElement("p", null, item.productCode),
                                    React.createElement("p", null, item.variant.colorName),
                                    React.createElement("p", null, item.series.name),
                                    unitPrice !== null && (
                                        React.createElement("p", { className: "cart-item-unit-price" },
                                            "(",
                                            hasDiscount ?
                                            React.createElement(React.Fragment, null,
                                                React.createElement("span", { className: "original-price" }, formatCurrency(unitPrice, item.series.currency)),
                                                " ",
                                                React.createElement("span", null, formatCurrency(discountedUnitPrice, item.series.currency))
                                            ) :
                                            React.createElement("span", null, formatCurrency(unitPrice, item.series.currency)),
                                            ` ${t.perPiece})`
                                        )
                                    )
                                ),
                                React.createElement("div", { className: "cart-item-actions" },
                                    React.createElement("div", { className: "cart-item-quantity-editor" },
                                    React.createElement("button", { onClick: () => onUpdateQuantity(item.series.id, Number(item.quantity || 0) - 1), "aria-label": "Decrease quantity" }, React.createElement(MinusIcon, null)),
                                    React.createElement("input", {
                                        type: "number",
                                        value: item.quantity,
                                        onChange: (e) => {
                                            const val = Number.parseInt(e.target.value, 10);
                                            if (!isNaN(val)) onUpdateQuantity(item.series.id, val);
                                        },
                                        "aria-label": "Item quantity"
                                    }),
                                    React.createElement("button", { onClick: () => onUpdateQuantity(item.series.id, Number(item.quantity || 0) + 1), "aria-label": "Increase quantity" }, React.createElement(PlusIcon, null)),
                                    ),
                                    React.createElement("div", { className: "cart-item-line-total" },
                                        hasDiscount && React.createElement("span", {
                                            className: "original-price",
                                            style: { display: 'block', fontSize: '0.8em', fontWeight: '400' }
                                        }, formatCurrency(Number(item.quantity || 0) * seriesPrice, item.series.currency)),
                                        formatCurrency(Number(item.quantity || 0) * discountedSeriesPrice, item.series.currency)
                                    ),
                                    React.createElement("button", { className: "remove-item-btn", onClick: () => onRemoveItem(item.series.id), "aria-label": "Remove item" },
                                    React.createElement(Trash2Icon, null)
                                    )
                                )
                            )
                        )
                    );
                })
              )
            ),
            cartItems.length > 0 && (
              React.createElement("footer", { className: "cart-footer" },
                React.createElement("div", { className: "cart-stats-summary" },
                   React.createElement("div", { className: "stat-row" },
                       React.createElement("span", null, t.itemTypes),
                       React.createElement("span", null, cartStats.totalItemTypes)
                   ),
                   React.createElement("div", { className: "stat-row" },
                       React.createElement("span", null, t.totalPacks),
                       React.createElement("span", null, cartStats.totalPacks)
                   ),
                   React.createElement("div", { className: "stat-row" },
                       React.createElement("span", null, t.totalUnits),
                       React.createElement("span", null, cartStats.totalUnits)
                   )
                ),
                React.createElement("div", { className: "totals-summary" },
                   Object.entries(totals).map(([currency, total]) => (
                     React.createElement("div", { key: currency, className: "total-row" },
                        React.createElement("span", null, `${t.total} (${currency})`),
                        React.createElement("span", null, formatCurrency(total, currency))
                     )
                   ))
                ),
                React.createElement("button", { className: "share-order-btn", onClick: onShareOrder, disabled: isSharing || isDownloadingExcel },
                    isSharing ? t.sharingOrder : t.shareOrder
                ),
                 React.createElement("button", { 
                    className: "download-excel-btn", 
                    onClick: onDownloadExcel, 
                    disabled: isDownloadingExcel || isSharing 
                },
                    isDownloadingExcel ? t.downloading : (
                        React.createElement(React.Fragment, null, 
                            React.createElement(DownloadIcon, null),
                            t.downloadExcel
                        )
                    )
                )
              )
            )
          )
        )
    );
};


// --- ORDER SHARE IMAGE COMPONENT ---
const OrderShareImage = forwardRef(({ cartItems, totals, t, storeSettings, cartStats }, ref) => {
    return (
        React.createElement("div", { id: "order-share-container", ref: ref },
            React.createElement("div", { className: "order-share-header" },
                React.createElement("div", { className: "order-share-store-info" },
                   storeSettings.logo && React.createElement("img", { src: storeSettings.logo, alt: "Store Logo", className: "order-share-logo", crossOrigin: "anonymous" }),
                   React.createElement("h2", null, storeSettings.name)
                ),
                React.createElement("p", null, new Date().toLocaleString())
            ),
            React.createElement("div", { className: "order-share-body" },
                cartItems.map((item, index) => {
                    const hasDiscount = typeof item.discountPercentage === 'number' && item.discountPercentage > 0;
                    const seriesPrice = item.series.price;
                    const discountedSeriesPrice = hasDiscount ? seriesPrice * (1 - (item.discountPercentage / 100)) : seriesPrice;

                    const units = getUnitsPerSeries(item.series.name);
                    const unitPrice = units > 1 ? seriesPrice / units : null;
                    const discountedUnitPrice = (unitPrice && hasDiscount) ? unitPrice * (1 - (item.discountPercentage / 100)) : unitPrice;

                    return (
                        React.createElement("div", { key: `${item.series.id}-${index}`, className: "order-share-item" },
                            React.createElement("img", { src: getTransformedImageUrl(item.variant.imageUrl, { width: 120, height: 120 }), alt: item.variant.colorName, className: "order-share-img", crossOrigin: "anonymous" }),
                            React.createElement("div", { className: "order-share-details" },
                                React.createElement("p", { className: "order-share-pname" },
                                    item.productName, " ", React.createElement("span", { className: "order-share-pcode" }, `(${item.productCode})`),
                                    hasDiscount && React.createElement("span", { className: "discount-tag", style: { marginLeft: '8px', fontSize: '0.7rem'} }, `%${item.discountPercentage}`)
                                ),
                                React.createElement("p", { className: "order-share-pseries" },
                                    `${item.variant.colorName} - ${item.series.name}`,
                                    unitPrice !== null && (
                                        React.createElement("span", { className: "order-share-unit-price" },
                                            " (",
                                            hasDiscount ?
                                            React.createElement(React.Fragment, null,
                                                React.createElement("span", { className: "original-price" }, formatCurrency(unitPrice, item.series.currency)),
                                                " / ",
                                                React.createElement("span", null, formatCurrency(discountedUnitPrice, item.series.currency))
                                            ) :
                                            formatCurrency(unitPrice, item.series.currency),
                                            `${t.perPiece})`
                                        )
                                    )
                                )
                            ),
                            React.createElement("div", { className: "order-share-pricing" },
                                React.createElement("p", { className: "price" }, 
                                    hasDiscount && React.createElement("span", { className: "original-price", style: { display: 'block', fontSize: '0.8em', fontWeight: '400' } }, formatCurrency(Number(item.quantity || 0) * seriesPrice, item.series.currency)),
                                    formatCurrency(Number(item.quantity || 0) * discountedSeriesPrice, item.series.currency)
                                ),
                                React.createElement("p", { className: "qty" }, `Qty: ${item.quantity}`)
                            )
                        )
                    );
                })
            ),
            React.createElement("div", { className: "order-share-stats" },
                React.createElement("div", { className: "order-share-stat-item" },
                    React.createElement("span", null, cartStats.totalItemTypes),
                    React.createElement("label", null, t.itemTypes)
                ),
                React.createElement("div", { className: "order-share-stat-item" },
                    React.createElement("span", null, cartStats.totalPacks),
                    React.createElement("label", null, t.totalPacks)
                ),
                React.createElement("div", { className: "order-share-stat-item" },
                    React.createElement("span", null, cartStats.totalUnits),
                    React.createElement("label", null, t.totalUnits)
                )
            ),
            React.createElement("div", { className: "order-share-footer" },
                Object.entries(totals).map(([currency, total]) => (
                    React.createElement("div", { key: currency, className: "order-share-total-row" },
                        React.createElement("span", null, `${t.total} (${currency})`),
                        React.createElement("span", null, formatCurrency(total, currency))
                    )
                ))
            )
        )
    );
});


// --- ADMIN PANEL COMPONENTS ---
const AdminPasswordModal = ({ isOpen, onClose, onSubmit, password, setPassword, error, t }) => {
    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit();
    };

    return (
        React.createElement("div", { className: "modal-overlay", onClick: onClose },
            React.createElement("div", { className: "modal-container password-modal", onClick: (e) => e.stopPropagation() },
                React.createElement("header", { className: "modal-header" },
                    React.createElement("h3", null, t.adminLogin),
                    React.createElement("button", { className: "close-modal-btn", onClick: onClose, "aria-label": "Close modal" }, "×")
                ),
                React.createElement("form", { onSubmit: handleSubmit, className: "modal-body" },
                    React.createElement("div", { className: "form-group" },
                        React.createElement("label", { htmlFor: "admin-password" }, t.enterPassword),
                        React.createElement("input", {
                            id: "admin-password",
                            type: "password",
                            value: password,
                            onChange: (e) => setPassword(e.target.value),
                            autoFocus: true
                        })
                    ),
                    error && React.createElement("p", { className: "password-error" }, error),
                    React.createElement("div", { className: "form-actions password-modal-actions" },
                        React.createElement("button", { type: "button", className: "btn-secondary", onClick: onClose }, t.cancel),
                        React.createElement("button", { type: "submit", className: "btn-primary" }, t.submit)
                    )
                )
            )
        )
    );
};


const CollarTypeForm = ({ type: initialType, onSave, onCancel, t }) => {
    const [type, setType] = useState(initialType);

    return (
        React.createElement("div", { className: "template-edit-form" },
            React.createElement("h2", null, type.id.startsWith('new_') ? t.addNewCollarType : t.editCollarType),
            React.createElement("div", { className: "form-group" },
                React.createElement("label", null, t.collarTypeName),
                React.createElement("input", { type: "text", value: type.name, onChange: (e) => setType({ ...type, name: e.target.value }), autoFocus: true })
            ),
            React.createElement("div", { className: "form-actions" },
                React.createElement("button", { className: "btn-primary", onClick: () => onSave(type) }, t.saveChanges),
                React.createElement("button", { className: "btn-secondary", onClick: onCancel }, t.cancel)
            )
        )
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
        return React.createElement(CollarTypeForm, { type: editingType, onSave: handleSave, onCancel: () => setEditingType(null), t: t });
    }

    return (
        React.createElement("div", null,
            React.createElement("div", { className: "admin-header" },
                React.createElement("h2", null, t.collarTypes),
                React.createElement("button", { className: "btn-primary", onClick: handleAddNew }, "+ ", t.addNewCollarType)
            ),
            React.createElement("div", { className: "template-list" },
                collarTypes.map((type) => (
                    React.createElement("div", { key: type.id, className: "template-item" },
                        React.createElement("div", { className: "template-info" },
                            React.createElement("h4", null, t[getTranslationKey(type.name)] || type.name)
                        ),
                        React.createElement("div", { className: "template-actions" },
                            React.createElement("button", { className: "btn-secondary", onClick: () => setEditingType(type) }, t.edit),
                            React.createElement("button", { className: "btn-danger", onClick: () => handleDelete(type.id) }, t.delete)
                        )
                    )
                ))
            )
        )
    );
};

const ContentTemplateForm = ({ template: initialTemplate, onSave, onCancel, t }) => {
    const [template, setTemplate] = useState(initialTemplate);

    return (
        React.createElement("div", { className: "template-edit-form" },
            React.createElement("h2", null, template.id.startsWith('new_') ? t.addNewContentTemplate : t.editContentTemplate),
            React.createElement("div", { className: "form-group" },
                React.createElement("label", null, t.contentTemplateName),
                React.createElement("input", { type: "text", value: template.name, onChange: (e) => setTemplate({ ...template, name: e.target.value }), autoFocus: true })
            ),
            React.createElement("div", { className: "form-actions" },
                React.createElement("button", { className: "btn-primary", onClick: () => onSave(template) }, t.saveChanges),
                React.createElement("button", { className: "btn-secondary", onClick: onCancel }, t.cancel)
            )
        )
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
        return React.createElement(ContentTemplateForm, { template: editingTemplate, onSave: handleSave, onCancel: () => setEditingTemplate(null), t: t });
    }

    return (
        React.createElement("div", null,
            React.createElement("div", { className: "admin-header" },
                React.createElement("h2", null, t.contentTemplates),
                React.createElement("button", { className: "btn-primary", onClick: handleAddNew }, "+ ", t.addNewContentTemplate)
            ),
            React.createElement("div", { className: "template-list" },
                contentTemplates.map((template) => (
                    React.createElement("div", { key: template.id, className: "template-item" },
                        React.createElement("div", { className: "template-info" },
                            React.createElement("h4", null, template.name)
                        ),
                        React.createElement("div", { className: "template-actions" },
                            React.createElement("button", { className: "btn-secondary", onClick: () => setEditingTemplate(template) }, t.edit),
                            React.createElement("button", { className: "btn-danger", onClick: () => handleDelete(template.id) }, t.delete)
                        )
                    )
                ))
            )
        )
    );
};

const GenderTemplateForm = ({ template: initialTemplate, onSave, onCancel, t }) => {
    const [template, setTemplate] = useState(initialTemplate);

    return (
        React.createElement("div", { className: "template-edit-form" },
            React.createElement("h2", null, template.id.startsWith('new_') ? t.addNewGenderTemplate : t.editGenderTemplate),
            React.createElement("div", { className: "form-group" },
                React.createElement("label", null, t.genderTemplateName),
                React.createElement("input", { type: "text", value: template.name, onChange: (e) => setTemplate({ ...template, name: e.target.value }), autoFocus: true })
            ),
            React.createElement("div", { className: "form-actions" },
                React.createElement("button", { className: "btn-primary", onClick: () => onSave(template) }, t.saveChanges),
                React.createElement("button", { className: "btn-secondary", onClick: onCancel }, t.cancel)
            )
        )
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
        return React.createElement(GenderTemplateForm, { template: editingTemplate, onSave: handleSave, onCancel: () => setEditingTemplate(null), t: t });
    }

    return (
        React.createElement("div", null,
            React.createElement("div", { className: "admin-header" },
                React.createElement("h2", null, t.genderTemplates),
                React.createElement("button", { className: "btn-primary", onClick: handleAddNew }, "+ ", t.addNewGenderTemplate)
            ),
            React.createElement("div", { className: "template-list" },
                genderTemplates.map((template) => (
                    React.createElement("div", { key: template.id, className: "template-item" },
                        React.createElement("div", { className: "template-info" },
                            React.createElement("h4", null, t[template.name.toLowerCase()] || template.name)
                        ),
                        React.createElement("div", { className: "template-actions" },
                            React.createElement("button", { className: "btn-secondary", onClick: () => setEditingTemplate(template) }, t.edit),
                            React.createElement("button", { className: "btn-danger", onClick: () => handleDelete(template.id) }, t.delete)
                        )
                    )
                ))
            )
        )
    );
};


const ProductForm = ({ product: initialProduct, seriesTemplates, collarTypes, contentTemplates, genderTemplates, onSave, onCancel, t }) => {
    const [product, setProduct] = useState(JSON.parse(JSON.stringify(initialProduct)));
    const [uploadingVideo, setUploadingVideo] = useState({ active: false, type: null, index: null });
    const [openTemplateDropdown, setOpenTemplateDropdown] = useState(null);
    const [quickStockValues, setQuickStockValues] = useState({});
    const [editingUnitPrice, setEditingUnitPrice] = useState(null);
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

        const filePath = `${Date.now()}-${file.name}`;
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

        const filePath = `public/${Date.now()}-${file.name.replace(/\s/g, '_')}`;
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
        React.createElement("div", { className: "admin-edit-form" },
            React.createElement("h2", null, product.id.startsWith('new_') ? t.addNewProduct : t.editProduct),
            React.createElement("div", { className: "form-section" },
                React.createElement("div", { className: "form-group" },
                    React.createElement("label", null, t.productName),
                    React.createElement("input", { type: "text", value: product.name, onChange: (e) => handleChange('name', e.target.value) })
                ),
                React.createElement("div", { className: "form-grid" },
                    React.createElement("div", { className: "form-group" },
                        React.createElement("label", null, t.productCode),
                        React.createElement("input", { type: "text", value: product.code, onChange: (e) => handleChange('code', e.target.value) })
                    ),
                    React.createElement("div", { className: "form-group" },
                        React.createElement("label", null, "Discount Percentage (%)"),
                        React.createElement("input", { 
                            type: "number", 
                            min: "0", 
                            max: "100", 
                            placeholder: "e.g. 20", 
                            value: product.discountPercentage || '', 
                            onChange: (e) => handleChange('discountPercentage', parseInt(e.target.value, 10) || 0) 
                        })
                    )
                ),
                 React.createElement("div", { className: "form-group" },
                    React.createElement("label", null, "Video (Optional)"),
                    product.video_url && React.createElement("video", { key: product.video_url, src: product.video_url, controls: true, muted: true, playsInline: true, style:{ maxWidth: '200px', maxHeight: '150px', marginBottom: '10px', display: 'block', borderRadius: 'var(--border-radius)' } }),
                    React.createElement("div", { style: { display: 'flex', gap: '10px', alignItems: 'center'} },
                      React.createElement("input", {
                        type: "url",
                        value: product.video_url || '',
                        onChange: (e) => handleChange('video_url', e.target.value),
                        placeholder:"https://... or upload",
                        style: { flexGrow: 1 }
                      }),
                      React.createElement("input", {
                          type: "file",
                          id: 'mainVideoUpload',
                          style: { display: 'none' },
                          accept: "video/*",
                          onChange: (e) => handleVideoUpload(e)
                      }),
                      React.createElement("label", { htmlFor: 'mainVideoUpload', className: "btn-secondary" },
                          uploadingVideo.active && uploadingVideo.type === 'main' ? t.uploadingVideo : t.uploadFromDevice
                      )
                    )
                ),
                React.createElement("div", { className: "form-grid" },
                    React.createElement("div", { className: "form-group" },
                        React.createElement("label", null, t.season),
                        React.createElement("select", { value: product.season || '', onChange: (e) => handleChange('season', e.target.value) },
                            React.createElement("option", { value: "" }, t.select),
                            React.createElement("option", { value: "Summer" }, t.summer),
                            React.createElement("option", { value: "Winter" }, t.winter),
                            React.createElement("option", { value: "All Season" }, t.allSeason)
                        )
                    ),
                    React.createElement("div", { className: "form-group" },
                        React.createElement("label", null, t.collarType),
                        React.createElement("select", { value: product.collarType || '', onChange: (e) => handleChange('collarType', e.target.value) },
                            React.createElement("option", { value: "" }, t.select),
                            collarTypes.map((ct) => (
                                React.createElement("option", { key: ct.id, value: ct.name }, t[getTranslationKey(ct.name)] || ct.name)
                            ))
                        )
                    )
                ),
                React.createElement("div", { className: "form-grid" },
                    React.createElement("div", { className: "form-group" },
                        React.createElement("label", null, t.contentPercentage),
                        React.createElement("select", { value: product.content || '', onChange: (e) => handleChange('content', e.target.value) },
                            React.createElement("option", { value: "" }, t.select),
                            contentTemplates.map((ct) => (
                                React.createElement("option", { key: ct.id, value: ct.name }, ct.name)
                            ))
                        )
                    ),
                    React.createElement("div", { className: "form-group" },
                        React.createElement("label", null, t.gender),
                        React.createElement("select", { value: product.gender || '', onChange: (e) => handleChange('gender', e.target.value) },
                            React.createElement("option", { value: "" }, t.select),
                            genderTemplates.map((gt) => (
                                React.createElement("option", { key: gt.id, value: gt.name }, t[gt.name.toLowerCase()] || gt.name)
                            ))
                        )
                    )
                )
            ),

            React.createElement("h3", null, t.variants),
            product.variants.map((variant, vIdx) => {
                const variantId = variant.id || vIdx;
                const currentQuickStockValue = quickStockValues[variantId] || '';
                return (
                    React.createElement("div", { key: variantId, className: "variant-section" },
                        React.createElement("div", { className: "variant-header" },
                            React.createElement("h4", null, `${t.colorName}: ${variant.colorName || `(${t.new})`}`),
                            React.createElement("div", { className: "variant-header-actions" },
                                React.createElement("button", { className: "btn-icon", onClick: () => duplicateVariant(vIdx), title: t.duplicateVariant },
                                    React.createElement(CopyIcon, null)
                                ),
                                React.createElement("button", { className: "btn-remove-nested", onClick: () => removeVariant(vIdx) }, t.removeVariant)
                            )
                        ),
                        React.createElement("div", { className: "form-grid" },
                            React.createElement("div", { className: "form-group" },
                                React.createElement("label", null, t.colorName),
                                React.createElement("input", { type: "text", value: variant.colorName, onChange: (e) => handleVariantChange(vIdx, 'colorName', e.target.value) })
                            ),
                            React.createElement("div", { className: "form-group" },
                                React.createElement("label", null, t.colorCode),
                                React.createElement("input", { type: "color", className: "color-input", value: variant.colorCode, onChange: (e) => handleVariantChange(vIdx, 'colorCode', e.target.value) })
                            )
                        ),
                         React.createElement("div", { className: "form-group" },
                            React.createElement("label", null, t.productImage),
                            React.createElement("div", { className: "image-upload-container" },
                                variant.imageUrl && React.createElement("img", { src: getTransformedImageUrl(variant.imageUrl, { width: 160, height: 160 }), alt: "Preview", className: "image-preview" }),
                                React.createElement("input", {
                                    type: "file",
                                    id: `imageUpload_${variant.id}`,
                                    style: { display: 'none' },
                                    accept: "image/*",
                                    onChange: (e) => handleImageUpload(e, vIdx)
                                }),
                                React.createElement("label", { htmlFor: `imageUpload_${variant.id}`, className: "btn-secondary" },
                                    t.uploadImage
                                )
                            )
                        ),
                        React.createElement("div", { className: "form-group" },
                            React.createElement("label", null, t.videoUrlVariant),
                            variant.video_url && React.createElement("video", { key: variant.video_url, src: variant.video_url, controls: true, muted: true, playsInline: true, style:{ maxWidth: '200px', maxHeight: '150px', marginBottom: '10px', display: 'block', borderRadius: 'var(--border-radius)' } }),
                            React.createElement("div", { style: { display: 'flex', gap: '10px', alignItems: 'center'} },
                              React.createElement("input", {
                                  type: "url",
                                  value: variant.video_url || '',
                                  onChange: (e) => handleVariantChange(vIdx, 'video_url', e.target.value),
                                  placeholder:"https://... or upload",
                                  style: { flexGrow: 1 }
                              }),
                              React.createElement("input", {
                                  type: "file",
                                  id: `variantVideoUpload_${variant.id}`,
                                  style: { display: 'none' },
                                  accept: "video/*",
                                  onChange: (e) => handleVideoUpload(e, vIdx)
                              }),
                              React.createElement("label", { htmlFor: `variantVideoUpload_${variant.id}`, className: "btn-secondary" },
                                  uploadingVideo.active && uploadingVideo.type === 'variant' && uploadingVideo.index === vIdx ? t.uploadingVideo : t.uploadFromDevice
                              )
                            )
                        ),
                        
                        React.createElement("h5", null, t.series_packs),

                        React.createElement("div", { className: "quick-stock-controls" },
                            React.createElement("label", { htmlFor: `quick-stock-${variantId}` }, t.quickStockUpdate),
                            React.createElement("div", { className: "quick-stock-input-group" },
                                React.createElement("input", {
                                    id: `quick-stock-${variantId}`,
                                    type: "number",
                                    placeholder: "Qty",
                                    value: currentQuickStockValue,
                                    onChange: (e) => handleQuickStockValueChange(String(variantId), e.target.value)
                                }),
                                React.createElement("button", { type: "button", className: "btn-secondary", onClick: () => handleBulkStockUpdate(vIdx, currentQuickStockValue) }, t.set),
                                React.createElement("button", { type: "button", className: "btn-secondary", onClick: () => handleBulkStockUpdate(vIdx, '0') }, t.setToZero)
                            )
                        ),

                        React.createElement("div", { className: "custom-dropdown-container", ref: openTemplateDropdown === vIdx ? dropdownRef : null },
                            React.createElement("button", { type: "button", className: "btn-secondary dropdown-toggle-btn", onClick: () => setOpenTemplateDropdown(openTemplateDropdown === vIdx ? null : vIdx) },
                                React.createElement("span", null, t.applyTemplate),
                                React.createElement("span", { className: "dropdown-arrow" }, "▼")
                            ),
                            openTemplateDropdown === vIdx && (
                                React.createElement("ul", { className: "dropdown-menu" },
                                    seriesTemplates.length > 0
                                        ? seriesTemplates.map((template) => (
                                            React.createElement("li", { key: template.id, onClick: () => handleTemplateSelect(vIdx, template.id) },
                                                template.name
                                            )
                                        ))
                                        : React.createElement("li", { className: "dropdown-menu-empty" }, "No templates available")
                                )
                            )
                        ),

                        React.createElement("div", { className: "series-list" },
                            variant.series.map((series, sIdx) => {
                                const units = getUnitsPerSeries(series.name);
                                const unitPrice = (series.price > 0 && units > 0) ? (series.price / units) : (series._unitPrice || 0);
                                const seriesKey = `${vIdx}-${sIdx}`;
                                const isEditingThis = editingUnitPrice?.key === seriesKey;
                                return (
                                    React.createElement("div", { key: series.id || sIdx, className: "series-item-form" },
                                        React.createElement("input", { type: "text", placeholder: t.seriesName, value: series.name, onChange: (e) => handleSeriesChange(vIdx, sIdx, 'name', e.target.value) }),
                                        React.createElement("input", {
                                            type: "text",
                                            inputMode: "decimal",
                                            placeholder: t.unitPrice,
                                            value: isEditingThis ? editingUnitPrice.value : (unitPrice > 0 ? String(unitPrice.toFixed(2)) : ''),
                                            onFocus: () => setEditingUnitPrice({ key: seriesKey, value: unitPrice > 0 ? String(unitPrice.toFixed(2)) : '' }),
                                            onChange: (e) => {
                                                const val = e.target.value;
                                                if (/^\d*\.?\d*$/.test(val)) {
                                                    setEditingUnitPrice({ key: seriesKey, value: val });
                                                }
                                            },
                                            onBlur: () => {
                                                if (isEditingThis) {
                                                    handleSeriesChange(vIdx, sIdx, 'unitPrice', editingUnitPrice.value);
                                                    setEditingUnitPrice(null);
                                                }
                                            }
                                        }),
                                        React.createElement("div", { className: "series-total-price-display", title: t.price },
                                            formatCurrency(series.price, series.currency)
                                        ),
                                        React.createElement("select", { value: series.currency, onChange: (e) => handleSeriesChange(vIdx, sIdx, 'currency', e.target.value) },
                                            React.createElement("option", { value: "USD" }, "USD"),
                                            React.createElement("option", { value: "EUR" }, "EUR"),
                                            React.createElement("option", { value: "TRY" }, "TRY")
                                        ),
                                        React.createElement("input", { type: "number", placeholder: t.stock, value: series.stock, onChange: (e) => handleSeriesChange(vIdx, sIdx, 'stock', e.target.value) }),
                                        React.createElement("button", { className: "btn-remove-series", onClick: () => removeSeries(vIdx, sIdx) }, "×")
                                    )
                                );
                            })
                        ),
                        React.createElement("button", { type: "button", className: "btn-add-nested", onClick: () => addSeries(vIdx) }, "+ ", t.addSeries)
                    )
                );
            }),
            React.createElement("button", { type: "button", className: "btn-add-variant", onClick: addVariant }, "+ ", t.addVariant),

            React.createElement("div", { className: "form-actions" },
                React.createElement("button", { className: "btn-primary", onClick: () => onSave(product) }, t.saveChanges),
                React.createElement("button", { className: "btn-secondary", onClick: onCancel }, t.cancel)
            )
        )
    );
};

const ProductManager = ({ products, seriesTemplates, collarTypes, contentTemplates, genderTemplates, onFetchData, t }) => {
    const [editingProduct, setEditingProduct] = useState(null);

    const handleAddNew = () => {
        const newProduct = {
            id: `new_${generateId()}`,
            name: '',
            code: '',
            video_url: '',
            discountPercentage: 0,
            variants: [],
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
                onFetchData();
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
            onFetchData();
            setEditingProduct(null);

        } catch (error) {
            console.error("Error saving product:", error);
            const errorMessage = error?.message || JSON.stringify(error) || 'An unknown error occurred.';
            alert(`Failed to save product: ${errorMessage}`);
        }
    };
    
    if (editingProduct) {
        return React.createElement(ProductForm, { 
          product: editingProduct, 
          seriesTemplates: seriesTemplates,
          collarTypes: collarTypes,
          contentTemplates: contentTemplates,
          genderTemplates: genderTemplates,
          onSave: handleSave, 
          onCancel: () => setEditingProduct(null), 
          t: t 
        });
    }

    return (
        React.createElement("div", null,
            React.createElement("div", { className: "admin-header" },
                React.createElement("h2", null, t.productManagement),
                React.createElement("button", { className: "btn-primary", onClick: handleAddNew }, "+ ", t.addNewProduct)
            ),
            React.createElement("div", { className: "admin-product-list" },
                products.map((product) => (
                    React.createElement("div", { key: product.id, className: "admin-product-row" },
                        React.createElement("img", { src: getTransformedImageUrl(product.variants[0]?.imageUrl, { width: 120, height: 120 }) || '', alt: product.name, className: "admin-product-thumb", crossOrigin: "anonymous" }),
                        React.createElement("div", { className: "admin-product-info" },
                            React.createElement("h4", null, product.name),
                            React.createElement("p", null, product.code)
                        ),
                        React.createElement("div", { className: "admin-product-actions" },
                            React.createElement("button", { className: "btn-secondary", onClick: () => handleEdit(product) }, t.edit),
                            React.createElement("button", { className: "btn-danger", onClick: () => handleDelete(product.id) }, t.delete)
                        )
                    )
                ))
            )
        )
    );
};

const QuickStockManager = ({ products, onFetchData, t }) => {
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
                onFetchData();
                setStockInputs(prev => ({ ...prev, [variant.id]: '' }));
            }
            setIsUpdating(null);
        }
    };

    return (
        React.createElement("div", null,
            React.createElement("div", { className: "admin-header" },
                React.createElement("h2", null, t.quickStock)
            ),
            React.createElement("div", { className: "form-group" },
                React.createElement("input", {
                    type: "text",
                    value: searchQuery,
                    onChange: (e) => setSearchQuery(e.target.value),
                    placeholder: t.searchByCodeAndColor,
                    className: "quick-stock-search-input",
                    autoFocus: true
                })
            ),
            React.createElement("div", { className: "quick-stock-results-list" },
                filteredVariants.map((variant) => {
                    const totalStock = variant.series.reduce((sum, s) => sum + s.stock, 0);
                    const isBeingUpdated = isUpdating === variant.id;
                    const currentInputValue = stockInputs[variant.id] || '';

                    return (
                        React.createElement("div", { key: variant.id, className: "quick-stock-item" },
                            React.createElement("img", {
                                src: getTransformedImageUrl(variant.imageUrl, { width: 120, height: 120 }),
                                alt: variant.colorName,
                                className: "quick-stock-item-thumb",
                                crossOrigin: "anonymous"
                            }),
                            React.createElement("div", { className: "quick-stock-item-info" },
                                React.createElement("h4", null, `${variant.product.name} (${variant.product.code})`),
                                React.createElement("p", null, variant.colorName),
                                React.createElement("p", null, t.totalStock, ": ", React.createElement("strong", null, totalStock))
                            ),
                            React.createElement("div", { className: "quick-stock-item-actions" },
                                React.createElement("div", { className: "quick-stock-input-group" },
                                    React.createElement("input", {
                                        type: "number",
                                        placeholder: "Qty",
                                        className: "quantity-input",
                                        value: currentInputValue,
                                        onChange: (e) => handleStockInputChange(variant.id, e.target.value),
                                        disabled: isBeingUpdated,
                                        min: "0"
                                    }),
                                    React.createElement("button", {
                                        className: "btn-secondary",
                                        onClick: () => handleSetStock(variant, currentInputValue),
                                        disabled: isBeingUpdated || currentInputValue === ''
                                    }, t.set),
                                    React.createElement("button", {
                                        className: "btn-danger",
                                        onClick: () => handleSetStock(variant, '0'),
                                        disabled: totalStock === 0 || isBeingUpdated
                                    }, t.setToZero)
                                )
                            )
                        )
                    )
                })
            )
        )
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
        return React.createElement("button", {
            className: "btn-link-style",
            onClick: () => {
                setUrlInput(product.video_url || '');
                setIsEditing(true);
            }
        }, t.pasteVideoUrl);
    }

    return (
        React.createElement("div", { className: "url-upload-controls" },
            React.createElement("input", {
                type: "url",
                value: urlInput,
                onChange: (e) => setUrlInput(e.target.value),
                placeholder: "https://.../video.mp4",
                autoFocus: true
            }),
            React.createElement("div", { className: "url-upload-actions" },
                React.createElement("button", { className: "btn-secondary", onClick: () => setIsEditing(false) }, t.cancel),
                React.createElement("button", { className: "btn-primary", onClick: handleSave }, t.saveUrl)
            )
        )
    );
};

const ShortsManager = ({ products, onFetchData, t }) => {
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
            onFetchData(true);
        }
    };

    const handleVideoUpload = async (e, product) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploadingId(product.id);

        const filePath = `public/${Date.now()}-${file.name.replace(/\s/g, '_')}`;
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
                    const path = url.pathname.split('/product-videos/public/')[1];
                    if (path) {
                        await db.storage.from('product-videos').remove([`public/${path}`]);
                    }
                } catch (e) {
                    console.error("Could not parse or delete video from storage:", e);
                }
            }
            await updateVideoUrl(product.id, null);
        }
    };

    return (
        React.createElement("div", null,
            React.createElement("div", { className: "admin-header" },
                React.createElement("h2", null, t.shortsManagement)
            ),
            React.createElement("div", { className: "form-group" },
                React.createElement("input", {
                    type: "text",
                    value: searchQuery,
                    onChange: (e) => setSearchQuery(e.target.value),
                    placeholder: t.searchByProductNameOrCode,
                    className: "quick-stock-search-input"
                })
            ),
            React.createElement("div", { className: "quick-stock-results-list" },
                filteredProducts.map(product => {
                    const isUploading = uploadingId === product.id;
                    return React.createElement("div", { key: product.id, className: "quick-stock-item shorts-manager-item" },
                        React.createElement("img", {
                            src: getTransformedImageUrl(product.variants[0]?.imageUrl, { width: 140, height: 140 }),
                            alt: product.name,
                            className: "quick-stock-item-thumb",
                            crossOrigin: "anonymous"
                        }),
                        React.createElement("div", { className: "quick-stock-item-info" },
                            React.createElement("h4", null, product.name),
                            React.createElement("p", null, product.code)
                        ),
                        React.createElement("div", { className: "shorts-manager-item-actions" },
                            product.video_url && (
                                React.createElement("div", { className: "shorts-manager-item-video-wrapper" },
                                    React.createElement("video", {
                                        src: product.video_url,
                                        className: "shorts-manager-item-video-preview",
                                        controls: true,
                                        muted: true,
                                        playsInline: true,
                                        key: product.video_url
                                    }),
                                    React.createElement("button", { className: "btn-danger", onClick: () => handleRemoveVideo(product) }, t.removeVideo)
                                )
                            ),
                            isUploading ? React.createElement("p", { className: "upload-progress-indicator" }, t.uploadingVideo) : (
                                React.createElement(React.Fragment, null,
                                  React.createElement("div", { className: "upload-controls" },
                                      React.createElement("input", {
                                          type: "file",
                                          id: `video-upload-${product.id}`,
                                          accept: "video/*",
                                          style: { display: 'none' },
                                          onChange: (e) => handleVideoUpload(e, product)
                                      }),
                                      React.createElement("label", { htmlFor: `video-upload-${product.id}`, className: "btn-secondary" },
                                          product.video_url ? t.changeVideo : t.addVideo
                                      )
                                  ),
                                  React.createElement(URLVideoUploader, {
                                      product: product,
                                      onUpdate: updateVideoUrl,
                                      t: t
                                  })
                                )
                            )
                        )
                    )
                })
            )
        )
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
        return React.createElement(TemplateForm, { template: editingTemplate, onSave: handleSave, onCancel: () => setEditingTemplate(null), t: t });
    }

    return (
        React.createElement("div", null,
            React.createElement("div", { className: "admin-header" },
                React.createElement("h2", null, t.seriesTemplates),
                React.createElement("button", { className: "btn-primary", onClick: handleAddNew }, "+ ", t.addNewTemplate)
            ),
            React.createElement("div", { className: "template-list" },
                templates.map((template) => (
                    React.createElement("div", { key: template.id, className: "template-item" },
                        React.createElement("div", { className: "template-info" },
                            React.createElement("h4", null, template.name),
                            React.createElement("p", null, template.seriesNames.join(', '))
                        ),
                        React.createElement("div", { className: "template-actions" },
                            React.createElement("button", { className: "btn-secondary", onClick: () => setEditingTemplate(template) }, t.edit),
                            React.createElement("button", { className: "btn-danger", onClick: () => handleDelete(template.id) }, t.delete)
                        )
                    )
                ))
            )
        )
    );
};

const TemplateForm = ({ template: initialTemplate, onSave, onCancel, t }) => {
    const [template, setTemplate] = useState(initialTemplate);
    const [seriesText, setSeriesText] = useState(initialTemplate.seriesNames.join('\n'));

    const handleSave = () => {
        onSave({ ...template, seriesNames: seriesText.split('\n').filter((s) => s.trim() !== '') });
    };
    
    return (
        React.createElement("div", { className: "template-edit-form" },
            React.createElement("h2", null, template.id.startsWith('new_') ? t.addNewTemplate : t.editTemplate),
            React.createElement("div", { className: "form-group" },
                React.createElement("label", null, t.templateName),
                React.createElement("input", { type: "text", value: template.name, onChange: (e) => setTemplate({ ...template, name: e.target.value }) })
            ),
            React.createElement("div", { className: "form-group" },
                React.createElement("label", null, t.seriesNamesHelp),
                React.createElement("textarea", { rows: 6, value: seriesText, onChange: (e) => setSeriesText(e.target.value) })
            ),
            React.createElement("div", { className: "form-actions" },
                React.createElement("button", { className: "btn-primary", onClick: handleSave }, t.saveChanges),
                React.createElement("button", { className: "btn-secondary", onClick: onCancel }, t.cancel)
            )
        )
    );
};

const StoreSettingsEditor = ({ settings, onFetchData, t }) => {
    const [currentSettings, setCurrentSettings] = useState(settings);
    const [passwordFields, setPasswordFields] = useState({ current: '', newPass: '', confirmPass: '' });

    useEffect(() => {
        setCurrentSettings(settings);
    }, [settings]);

    const handleSettingChange = (e) => {
        const { name, value } = e.target;
        setCurrentSettings((s) => ({ ...s, [name]: value }));
    };

    const handlePasswordInputChange = (e) => {
        const { name, value } = e.target;
        setPasswordFields(p => ({ ...p, [name]: value }));
    };

    const handlePasswordChange = async () => {
        const { current, newPass, confirmPass } = passwordFields;
        if (!current || !newPass || !confirmPass) {
            alert(t.fillAllPasswordFields);
            return;
        }
        if (newPass !== confirmPass) {
            alert(t.newPasswordsDoNotMatch);
            return;
        }
        if (current !== settings.adminPassword) {
            alert(t.currentPasswordIncorrect);
            return;
        }

        const { error } = await db.from('store_settings').update({ admin_password: newPass }).eq('id', 1);

        if (error) {
            alert(`${t.passwordChangeFailed}: ${error.message}`);
        } else {
            alert(t.passwordChangedSuccess);
            setPasswordFields({ current: '', newPass: '', confirmPass: '' });
            onFetchData();
        }
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
        const { name, logo, brand, manufacturerTitle, origin, nameColor } = currentSettings;
        const { error } = await db.from('store_settings').update({
            name,
            logo,
            brand,
            manufacturer_title: manufacturerTitle,
            origin,
            name_color: nameColor
        }).eq('id', 1);

        if (error) {
            alert(`Failed to save settings: ${error.message}`);
            console.error(error);
        } else {
            alert("Settings saved!");
            onFetchData();
        }
    };

    return (
        React.createElement("div", { className: "settings-form" },
            React.createElement("div", { className: "admin-header" },
                React.createElement("h2", null, t.storeSettings)
            ),
            React.createElement("div", { className: "form-group" },
                React.createElement("label", null, t.storeNameLabel),
                React.createElement("input", { type: "text", name: "name", value: currentSettings.name || '', onChange: handleSettingChange })
            ),
            React.createElement("div", { className: "form-group" },
                React.createElement("label", null, t.storeNameColor),
                React.createElement("input", { type: "color", name: "nameColor", value: currentSettings.nameColor || '#192A56', onChange: handleSettingChange, className: "color-input" })
            ),
            React.createElement("div", { className: "form-group" },
                React.createElement("label", null, t.brandLabel),
                React.createElement("input", { type: "text", name: "brand", value: currentSettings.brand || '', onChange: handleSettingChange })
            ),
            React.createElement("div", { className: "form-group" },
                React.createElement("label", null, t.manufacturerTitleLabel),
                React.createElement("input", { type: "text", name: "manufacturerTitle", value: currentSettings.manufacturerTitle || '', onChange: handleSettingChange })
            ),
            React.createElement("div", { className: "form-group" },
                React.createElement("label", null, t.originLabel),
                React.createElement("input", { type: "text", name: "origin", value: currentSettings.origin || '', onChange: handleSettingChange })
            ),
            React.createElement("div", { className: "form-group" },
                React.createElement("label", null, t.storeLogoLabel),
                React.createElement("div", { className: "image-upload-container" },
                    currentSettings.logo && React.createElement("img", { src: currentSettings.logo, alt: "Logo Preview", className: "logo-preview" }),
                    React.createElement("input", { type: "file", id: "logoUpload", style: { display: 'none' }, accept: "image/*", onChange: handleLogoUpload }),
                    React.createElement("label", { htmlFor: "logoUpload", className: "btn-secondary" }, t.uploadLogo)
                )
            ),
            React.createElement("div", { className: "form-actions" },
                React.createElement("button", { className: "btn-primary", onClick: handleSave }, t.saveChanges)
            ),
            React.createElement("div", { className: "admin-section-divider" }),
            React.createElement("h3", null, t.changeAdminPassword),
            React.createElement("div", { className: "form-group" },
                React.createElement("label", null, t.currentPassword),
                React.createElement("input", { type: "password", name: "current", value: passwordFields.current, onChange: handlePasswordInputChange })
            ),
            React.createElement("div", { className: "form-group" },
                React.createElement("label", null, t.newPassword),
                React.createElement("input", { type: "password", name: "newPass", value: passwordFields.newPass, onChange: handlePasswordInputChange })
            ),
            React.createElement("div", { className: "form-group" },
                React.createElement("label", null, t.confirmNewPassword),
                React.createElement("input", { type: "password", name: "confirmPass", value: passwordFields.confirmPass, onChange: handlePasswordInputChange })
            ),
            React.createElement("div", { className: "form-actions" },
                React.createElement("button", { className: "btn-primary", onClick: handlePasswordChange }, t.changePassword)
            )
        )
    );
};


const AdminPanel = ({ products, seriesTemplates, storeSettings, collarTypes, contentTemplates, genderTemplates, onFetchData, t, activeTab, onActiveTabChange, onExit }) => {
    return (
        React.createElement("div", { className: "admin-panel" },
             React.createElement("div", { className: "admin-header" },
                React.createElement("h2", null, t.admin),
                React.createElement("button", { className: "btn-secondary", onClick: onExit }, t.viewCatalog)
            ),
            React.createElement("nav", { className: "admin-nav" },
                React.createElement("button", { onClick: () => onActiveTabChange('products'), className: activeTab === 'products' ? 'active' : '' }, t.productManager),
                React.createElement("button", { onClick: () => onActiveTabChange('quickStock'), className: activeTab === 'quickStock' ? 'active' : '' }, t.quickStock),
                React.createElement("button", { onClick: () => onActiveTabChange('shorts'), className: activeTab === 'shorts' ? 'active' : '' }, t.shortsManagement),
                React.createElement("button", { onClick: () => onActiveTabChange('templates'), className: activeTab === 'templates' ? 'active' : '' }, t.templatesAndTypes),
                React.createElement("button", { onClick: () => onActiveTabChange('settings'), className: activeTab === 'settings' ? 'active' : '' }, t.storeSettings)
            ),
            React.createElement("div", { className: "admin-content" },
                activeTab === 'products' && React.createElement(ProductManager, { products: products, seriesTemplates: seriesTemplates, collarTypes: collarTypes, contentTemplates: contentTemplates, genderTemplates: genderTemplates, onFetchData: onFetchData, t: t }),
                activeTab === 'quickStock' && React.createElement(QuickStockManager, { products: products, onFetchData: onFetchData, t: t }),
                activeTab === 'shorts' && React.createElement(ShortsManager, { products: products, onFetchData: onFetchData, t: t }),
                activeTab === 'templates' && (
                    React.createElement(React.Fragment, null,
                        React.createElement(SeriesTemplatesManager, { templates: seriesTemplates, onFetchData: onFetchData, t: t }),
                        React.createElement("div", { className: "admin-section-divider" }),
                        React.createElement(CollarTypesManager, { collarTypes: collarTypes, onFetchData: onFetchData, t: t }),
                        React.createElement("div", { className: "admin-section-divider" }),
                        React.createElement(ContentManager, { contentTemplates: contentTemplates, onFetchData: onFetchData, t: t }),
                        React.createElement("div", { className: "admin-section-divider" }),
                        React.createElement(GenderManager, { genderTemplates: genderTemplates, onFetchData: onFetchData, t: t })
                    )
                ),
                activeTab === 'settings' && React.createElement(StoreSettingsEditor, { settings: storeSettings, onFetchData: onFetchData, t: t })
            )
        )
    );
};


// --- GALLERY VIEW ---
const FilterSidebar = ({ isOpen, onClose, products, activeFilters, setActiveFilters, t }) => {
    const filterOptions = useMemo(() => {
        const seasons = new Set();
        const collarTypes = new Set();
        const seriesNames = new Set();
        const genders = new Set();

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
        React.createElement(React.Fragment, null,
            React.createElement("div", { className: `cart-overlay ${isOpen ? 'open' : ''}`, onClick: onClose }),
            React.createElement("aside", { className: `filter-sidebar ${isOpen ? 'open' : ''}` },
                React.createElement("header", { className: "cart-header" },
                    React.createElement("h2", { id: "filter-heading" }, t.filters),
                    React.createElement("button", { className: "close-cart-btn", onClick: onClose, "aria-label": "Close filters" }, "×")
                ),
                React.createElement("div", { className: "cart-body" },
                    React.createElement("div", { className: "filter-section" },
                        React.createElement("h3", null, t.discount),
                        React.createElement("div", { className: "filter-option" },
                            React.createElement("input", {
                                type: "checkbox",
                                id: "discount-filter",
                                checked: activeFilters.discounted || false,
                                onChange: handleDiscountToggle
                            }),
                            React.createElement("label", { htmlFor: "discount-filter" }, t.discountedProducts)
                        )
                    ),
                    React.createElement("div", { className: "filter-section" },
                        React.createElement("h3", null, t.season),
                        filterOptions.seasons.map(season => (
                            React.createElement("div", { key: season, className: "filter-option" },
                                React.createElement("input", {
                                    type: "checkbox",
                                    id: `season-${season}`,
                                    checked: activeFilters.seasons.includes(season),
                                    onChange: () => handleCheckboxChange('seasons', season)
                                }),
                                React.createElement("label", { htmlFor: `season-${season}` }, t[getTranslationKey(season)] || season)
                            )
                        ))
                    ),
                    React.createElement("div", { className: "filter-section" },
                        React.createElement("h3", null, t.collarType),
                        filterOptions.collarTypes.map(type => (
                            React.createElement("div", { key: type, className: "filter-option" },
                                React.createElement("input", {
                                    type: "checkbox",
                                    id: `collar-${type.replace(' ','-')}`,
                                    checked: activeFilters.collarTypes.includes(type),
                                    onChange: () => handleCheckboxChange('collarTypes', type)
                                }),
                                React.createElement("label", { htmlFor: `collar-${type.replace(' ','-')}` }, t[getTranslationKey(type)] || type)
                            )
                        ))
                    ),
                    React.createElement("div", { className: "filter-section" },
                        React.createElement("h3", null, t.gender),
                        filterOptions.genders.map(gender => (
                            React.createElement("div", { key: gender, className: "filter-option" },
                                React.createElement("input", {
                                    type: "checkbox",
                                    id: `gender-${gender}`,
                                    checked: activeFilters.genders.includes(gender),
                                    onChange: () => handleCheckboxChange('genders', gender)
                                }),
                                React.createElement("label", { htmlFor: `gender-${gender}` }, t[getTranslationKey(gender)] || gender)
                            )
                        ))
                    ),
                    React.createElement("div", { className: "filter-section" },
                        React.createElement("h3", null, t.series),
                        filterOptions.seriesNames.map(name => (
                            React.createElement("div", { key: name, className: "filter-option" },
                                React.createElement("input", {
                                    type: "checkbox",
                                    id: `series-${name.replace(' ','-')}`,
                                    checked: activeFilters.seriesNames.includes(name),
                                    onChange: () => handleCheckboxChange('seriesNames', name)
                                }),
                                React.createElement("label", { htmlFor: `series-${name.replace(' ','-')}` }, name)
                            )
                        ))
                    )
                ),
                 React.createElement("footer", { className: "cart-footer" },
                    React.createElement("button", { className: "btn-secondary", style: {width: '100%'}, onClick: resetFilters }, t.resetFilters)
                )
            )
        )
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
         React.createElement("div", { className: "modal-overlay", onClick: onClose },
            React.createElement("div", { className: "modal-container bulk-add-modal", onClick: (e) => e.stopPropagation() },
                React.createElement("header", { className: "modal-header" },
                    React.createElement("h3", null, t.configureItems),
                    React.createElement("button", { className: "close-modal-btn", onClick: onClose }, "×")
                ),
                React.createElement("div", { className: "modal-body" },
                    selectedVariants.map((variant) => {
                        const variantItems = items[variant.id];
                        if (!variantItems) return null;
                        return (
                            React.createElement("div", { key: variant.id, className: "bulk-add-item" },
                                React.createElement("img", { src: getTransformedImageUrl(variant.imageUrl, { width: 160, height: 160 }), className: "bulk-add-item-img", alt: variant.colorName }),
                                React.createElement("div", { className: "bulk-add-item-details" },
                                    React.createElement("p", { className: "bulk-add-item-name" }, `${variant.product.name} (${variant.product.code})`),
                                    React.createElement("p", { className: "bulk-add-item-color" }, variant.colorName),
                                    React.createElement("div", { className: "bulk-add-series-list" },
                                        variant.series.map((series) => {
                                            const isOutOfStock = series.stock <= 0;
                                            return (
                                                React.createElement("div", { key: series.id, className: "bulk-add-series-row" },
                                                    React.createElement("span", { className: "series-row-name" }, series.name),
                                                    isOutOfStock ? (
                                                        React.createElement("span", { className: "out-of-stock-label" }, t.outOfStock)
                                                    ) : (
                                                        React.createElement("div", { className: "quantity-stepper" },
                                                            React.createElement("button", { onClick: () => handleQuantityStep(variant.id, series.id, -1), disabled: (variantItems[series.id] || 0) <= 0 }, "-"),
                                                            React.createElement("input", {
                                                                type: "number",
                                                                min: "0",
                                                                max: series.stock,
                                                                value: variantItems[series.id] || 0,
                                                                onChange: (e) => handleItemChange(variant.id, series.id, e.target.value),
                                                                "aria-label": `Quantity for ${series.name}`
                                                            }),
                                                            React.createElement("button", { onClick: () => handleQuantityStep(variant.id, series.id, 1), disabled: (variantItems[series.id] || 0) >= series.stock }, "+")
                                                        )
                                                    )
                                                )
                                            );
                                        })
                                    )
                                )
                            )
                        );
                    })
                ),
                React.createElement("footer", { className: "modal-footer" },
                    React.createElement("button", { className: "btn-secondary", onClick: onClose }, t.cancel),
                    React.createElement("button", { className: "btn-primary", onClick: handleConfirm }, t.confirmAddToCart)
                )
            )
        )
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
            const numericUnitPrice = Number(data.price) / units;
            
            const templateName = seriesNameToTemplateMap.get(name);
            const abbreviation = templateName
                ? templateName.charAt(0).toUpperCase()
                : name.charAt(0).toUpperCase();

            return {
                abbreviation,
                numericUnitPrice,
                currency: data.currency
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
        React.createElement("div", { className: "product-album-card", onClick: onClick },
            React.createElement("div", { className: "album-card-image-container" },
                React.createElement("img", { src: getTransformedImageUrl(coverImage, { width: imageRenderSize, height: imageRenderSize }), alt: product.name })
            ),
            React.createElement("div", { className: "album-card-info" },
                React.createElement("p", { className: "album-card-code" },
                    React.createElement("span", null, `${product.name} - ${product.code}`),
                    product.discountPercentage > 0 && React.createElement("span", { className: "discount-tag" }, `%${product.discountPercentage}`)
                ),
                React.createElement("p", { className: "album-card-count" }, `${variantCount} ${t.colors}`),
                seriesInfo.length > 0 &&
                    React.createElement("div", { className: "album-card-series-info" },
                        seriesInfo.map((s, index) => {
                            if (typeof product.discountPercentage === 'number' && product.discountPercentage > 0) {
                                const discountedUnitPrice = s.numericUnitPrice * (1 - (product.discountPercentage / 100));
                                return (
                                    React.createElement("span", { key: index, className: "series-price-item discount" },
                                        `${s.abbreviation}: `,
                                        React.createElement("span", { className: "original-price" }, s.unitPrice),
                                        React.createElement("span", { className: "discounted-price" },
                                            formatCurrency(discountedUnitPrice, s.currency)
                                        )
                                    )
                                );
                            } else {
                                return (
                                    React.createElement("span", { key: index }, `${s.abbreviation}: ${s.unitPrice}`)
                                );
                            }
                        })
                    )
            )
        )
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
    const imageRef = useRef(null);
    const containerRef = useRef(null);
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

    const handleNavigate = useCallback((direction) => {
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
        const handleKeyDown = (e) => {
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
        } catch (error) {
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

    const clampOffset = useCallback((newOffset, currentZoom) => {
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

    const handleWheel = useCallback((e) => {
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
    
    const handleMouseDown = (e) => {
        if (zoom <= 1) return;
        e.preventDefault();
        setIsDragging(true);
        setDragStart({ x: e.clientX, y: e.clientY, offX: offset.x, offY: offset.y });
    };

    const handleMouseMove = (e) => {
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

    const getTouchDistance = (e) => Math.hypot(e.touches[0].clientX - e.touches[1].clientX, e.touches[0].clientY - e.touches[1].clientY);

    const handleTouchStart = (e) => {
        if (e.touches.length === 2) {
            pinchStartDist.current = getTouchDistance(e);
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

    const handleTouchMove = useCallback((e) => {
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

        const wheelHandler = e => handleWheel(e);
        const touchMoveHandler = e => handleTouchMove(e);

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
        React.createElement("div", { className: "image-viewer-overlay", onClick: onClose },
            React.createElement("div", { className: "image-viewer-top-controls" },
                React.createElement("button", { 
                    className: "image-viewer-btn share-btn", 
                    onClick: (e) => { e.stopPropagation(); handleShareImage(); }, 
                    disabled: isSharing, 
                    "aria-label": "Share image" 
                }, React.createElement(ShareIcon, null)),
                React.createElement("button", { 
                    className: "image-viewer-btn close-btn", 
                    onClick: onClose, 
                    "aria-label": "Close viewer" 
                }, React.createElement(XIcon, null)),
                React.createElement("button", { 
                    className: "image-viewer-btn add-to-cart-btn", 
                    onClick: (e) => { e.stopPropagation(); handleAddToCartClick(); }, 
                    "aria-label": "Add to cart" 
                }, React.createElement(CartPlusIcon, null))
            ),
            
            React.createElement("button", { 
                className: "image-viewer-btn image-viewer-nav prev", 
                onClick: (e) => { e.stopPropagation(); handleNavigate('prev'); }, 
                "aria-label": "Previous image" 
            }, React.createElement(ChevronLeftIcon, null)),
            
            React.createElement("div", {
                ref: containerRef,
                className: "image-viewer-container",
                onClick: (e) => e.stopPropagation(),
                onMouseDown: handleMouseDown,
                onMouseMove: handleMouseMove,
                onMouseUp: handleMouseUp,
                onMouseLeave: handleMouseUp,
                onDoubleClick: handleDoubleClick,
                onTouchStart: handleTouchStart,
                onTouchEnd: handleTouchEnd
            },
                isLoading && React.createElement("div", { className: "viewer-loader" }),
                React.createElement("img", {
                    ref: imageRef,
                    src: getTransformedImageUrl(image.imageUrl, {width: 2048, height: 2048, resize: 'contain', quality: 90}),
                    alt: `${image.product.name} - ${image.colorName}`,
                    className: `image-viewer-content ${isPannable ? 'pannable' : ''} ${isDragging ? 'panning' : ''} ${isLoading ? 'loading' : ''}`,
                    style: { 
                        transform: `scale(${zoom}) translate(${offset.x}px, ${offset.y}px)`,
                        transition: isDragging ? 'none' : 'transform 0.1s ease-out',
                        touchAction: 'none'
                    },
                    onLoad: () => setIsLoading(false)
                })
            ),

             React.createElement("button", { className: "image-viewer-btn image-viewer-nav next", onClick: (e) => { e.stopPropagation(); handleNavigate('next'); }, "aria-label": "Next image" },
                React.createElement(ChevronRightIcon, null)
            ),

            React.createElement("div", { className: "image-viewer-caption", onClick: (e) => e.stopPropagation() },
                `${image.product.name} (${image.product.code}) - ${image.colorName}`
            )
        )
    );
};

const LazyImage = ({ src, size, alt }) => {
    if (!src) {
        return React.createElement('div', { style: { width: '100%', height: '100%', backgroundColor: '#f0f0f0' }});
    }

    const placeholderSrc = getTransformedImageUrl(src, { width: 24, height: 24, quality: 20, resize: 'cover' });

    const imageWidths = [200, 400, 600, 800, 1200];
    const srcSet = imageWidths
        .map(width => `${getTransformedImageUrl(src, { width, height: width, quality: 80, resize: 'cover' })} ${width}w`)
        .join(', ');

    const defaultSrc = getTransformedImageUrl(src, { width: 400, height: 400, quality: 80, resize: 'cover' });
    
    const [isLoaded, setIsLoaded] = useState(false);
    
    return (
        React.createElement(React.Fragment, null,
            React.createElement("img", {
                src: placeholderSrc,
                alt: alt,
                style: {
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
                }
            }),
            React.createElement("img", {
                src: defaultSrc,
                srcSet: srcSet,
                sizes: `${Math.ceil(size)}px`,
                alt: alt,
                loading: "lazy",
                onLoad: () => setIsLoaded(true),
                style: {
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'opacity 0.4s ease-in',
                    opacity: isLoaded ? 1 : 0,
                    willChange: 'opacity',
                }
            })
        )
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
                const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
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
            } catch (error) {
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
                React.createElement(ProductAlbumCard, { 
                    key: p.product.id,
                    productGroup: p,
                    onClick: () => setFocusedProduct(p.product),
                    t: t,
                    seriesNameToTemplateMap: seriesNameToTemplateMap
                })
            ));
        }

        const displayedVariants = focusedProduct
            ? variants.filter((v) => v.product.id === focusedProduct.id)
            : variants;
            
        return displayedVariants.map((variant, index) => {
            return (
                React.createElement("div", {
                    key: variant.id,
                    className: `gallery-item ${selectedVariants.has(variant.id) ? 'selected' : ''} ${!isSelectMode ? 'zoomable' : ''}`,
                    onClick: () => {
                        if (isSelectMode) {
                            handleSelectVariant(variant.id);
                        } else {
                            setViewerIndex(index);
                        }
                    }
                },
                    React.createElement(LazyImage, { 
                        src: variant.imageUrl, 
                        size: itemSize, 
                        alt: variant.colorName 
                    }),
                    isSelectMode && (
                        React.createElement("div", { className: "selection-circle" },
                             selectedVariants.has(variant.id) && React.createElement(CheckIcon, null)
                        )
                    ),
                    React.createElement("div", { className: "gallery-item-info" }, React.createElement("span", null, `${variant.product.name} - ${variant.colorName}`))
                )
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
        React.createElement("div", { className: `gallery-view-wrapper ${isSelectMode ? 'select-mode-active' : ''}` },
             React.createElement("div", { className: "gallery-header" },
                React.createElement("button", { className: "btn-secondary filter-toggle-btn", onClick: onOpenFilters },
                    React.createElement("span", null, t.filters)
                ),
                React.createElement("div", { className: "gallery-view-mode-toggle" },
                  focusedProduct ? (
                      React.createElement("button", { className: "btn-secondary", onClick: () => setFocusedProduct(null) },
                          t.backToAlbums
                      )
                  ) : (
                      React.createElement("button", { className: "btn-secondary", onClick: () => setMode((m) => m === 'albums' ? 'variants' : 'albums') },
                          mode === 'albums' ? t.allItems : t.albums
                      )
                  )
                ),
                React.createElement("button", { className: "btn-secondary select-toggle-btn", onClick: handleToggleSelectMode, disabled: isAlbumMode },
                    isSelectMode ? t.cancel : t.select
                )
            ),
            React.createElement("div", {
                ref: containerRef,
                className: "gallery-view-container",
                style: gridStyles
            },
                renderContent()
            ),
            selectedVariants.size > 0 && (
                React.createElement("div", { className: "floating-action-bar" },
                    React.createElement("button", { onClick: handleShare, disabled: isSharing, title: isSharing ? t.sharingOrder : t.shareSelected },
                       React.createElement(ShareIcon, null)
                    ),
                    React.createElement("span", { className: "selection-count" }, t.itemsSelected.replace('{count}', String(selectedVariants.size))),
                    React.createElement("button", { onClick: () => setIsBulkModalOpen(true), title: t.bulkAddToCart },
                       React.createElement(CartPlusIcon, null)
                    )
                )
            ),
            React.createElement(BulkAddToCartModal, {
                isOpen: isBulkModalOpen,
                onClose: () => setIsBulkModalOpen(false),
                selectedVariants: variants.filter((v) => selectedVariants.has(v.id)),
                onConfirm: (items) => {
                    onBulkAddToCart(items);
                    setIsBulkModalOpen(false);
                    setSelectedVariants(new Set());
                    setIsSelectMode(false);
                },
                t: t
            }),
            itemsToShare.length > 0 && (
                 React.createElement("div", { id: "share-selection-container", ref: shareRef },
                    itemsToShare.map((item) => (
                        React.createElement("div", { key: item.id, className: "share-selection-item" },
                            React.createElement("img", { src: getTransformedImageUrl(item.imageUrl, {width: 200, height: 200}), alt: item.colorName, crossOrigin: "anonymous" }),
                            React.createElement("p", null, item.product.name),
                            React.createElement("p", null, `${item.colorName} - ${item.product.code}`)
                        )
                    ))
                )
            ),
            viewerIndex !== null && React.createElement(ImageViewer, {
                images: displayedVariantsForViewer,
                currentIndex: viewerIndex,
                onClose: () => setViewerIndex(null),
                t: t,
                onSelectOptions: onSelectOptions
            }),
            React.createElement("div", { className: "mobile-gallery-footer" },
                React.createElement("p", null, storeSettings.name),
                React.createElement("p", null, `© ${new Date().getFullYear()} ${storeSettings.brand || ''}. ${t.allRightsReserved}`)
            )
        )
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

    return React.createElement('div', { className: 'shorts-video-item' },
        React.createElement('video', {
            ref: videoRef,
            key: currentVideo.url, // Force re-render on source change
            className: 'shorts-video-element',
            src: currentVideo.url,
            loop: true,
            playsInline: true,
            muted: isMuted,
            'data-product-id': item.product.id,
        }),
        React.createElement('div', { className: 'shorts-video-overlay', onClick: togglePlay },
            React.createElement('div', null,
                React.createElement('div', { className: 'shorts-video-info-wrapper' },
                    (activeVariant && activeVariant.colorCode) && React.createElement('div', {
                        className: 'current-variant-color',
                        style: { backgroundColor: activeVariant.colorCode }
                    }),
                    React.createElement('div', { className: 'shorts-video-info' },
                        React.createElement('h3', null, item.product.name),
                        React.createElement('p', null, `${item.product.code} ${activeVariant ? `- ${activeVariant.colorName}` : ''}`)
                    )
                ),
                item.videoVariants.length > 0 && React.createElement('div', { className: 'shorts-variant-selector' },
                    item.videoVariants.map(variant =>
                        React.createElement('div', {
                            key: variant.id,
                            className: `variant-swatch ${activeVariant && activeVariant.id === variant.id ? 'active' : ''}`,
                            style: { backgroundColor: variant.colorCode },
                            title: variant.colorName,
                            onClick: (e) => {
                                e.stopPropagation();
                                handleSwatchClick(variant);
                            }
                        })
                    )
                )
            )
        ),
        React.createElement('div', { className: 'shorts-video-controls' },
            React.createElement('button', { onClick: toggleMute, "aria-label": isMuted ? "Unmute" : "Mute" },
                isMuted ? React.createElement(VolumeOffIcon, null) : React.createElement(VolumeOnIcon, null)
            )
        )
    );
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

    return React.createElement('div', { className: 'shorts-player-overlay' },
        React.createElement('button', { className: 'shorts-player-close-btn', onClick: onClose }, React.createElement(XIcon)),
        React.createElement('div', { className: 'shorts-player-container', ref: containerRef },
            mainVideosOnly.map(item =>
                React.createElement(ShortsVideoItem, {
                    key: item.product.id,
                    item: item,
                    isActive: item.product.id === intersectingId,
                })
            )
        )
    );
};

// --- ADD TO HOME SCREEN BANNER ---
const AddToHomeScreenBanner = ({ onInstall, onDismiss, storeSettings, t }) => {
    return (
        React.createElement("div", { className: "add-to-home-screen-banner" },
            React.createElement("button", { className: "a2hs-dismiss-btn", onClick: onDismiss, "aria-label": "Dismiss" }, "×"),
            React.createElement("img", { src: storeSettings.logo || "/icon-192x192.png", alt: "App Icon", className: "a2hs-logo" }),
            React.createElement("div", { className: "a2hs-text" },
                React.createElement("strong", null, t.a2hsTitle.replace('{appName}', storeSettings.name)),
                React.createElement("span", null, t.a2hsDescription)
            ),
            React.createElement("button", { className: "a2hs-install-btn", onClick: onInstall }, t.a2hsInstall)
        )
    );
};

const IosInstallBanner = ({ onDismiss, storeSettings, t }) => {
    return (
        React.createElement("div", { className: "add-to-home-screen-banner" },
            React.createElement("button", { className: "a2hs-dismiss-btn", onClick: onDismiss, "aria-label": t.close }, "×"),
            React.createElement(ShareIconIos, null),
            React.createElement("div", { className: "a2hs-text", style: { marginRight: 0 } },
                React.createElement("strong", null, t.a2hsTitle.replace('{appName}', storeSettings.name)),
                React.createElement("span", null, t.a2hsIosInstruction)
            )
        )
    );
};


// --- MAIN APP COMPONENT ---
const App = () => {
  const [products, setProducts] = useState([]);
  const [seriesTemplates, setSeriesTemplates] = useState([]);
  const [collarTypes, setCollarTypes] = useState([]);
  const [contentTemplates, setContentTemplates] = useState([]);
  const [genderTemplates, setGenderTemplates] = useState([]);
  const [storeSettings, setStoreSettings] = useState({ name: "Loading...", logo: null, brand: '', manufacturerTitle: '', origin: '', nameColor: '#192A56', adminPassword: 'klm!44' });
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
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState({ seasons: [], collarTypes: [], seriesNames: [], genders: [], discounted: false });
  const [isMobileSearchVisible, setIsMobileSearchVisible] = useState(false);
  const [isShortsPlayerOpen, setIsShortsPlayerOpen] = useState(false);
  const [activeShortId, setActiveShortId] = useState(null);
  const [adminActiveTab, setAdminActiveTab] = useState('products');
  const shareImageRef = useRef(null);

  const isNewProduct = (createdAt) => {
    if (!createdAt) return false;
    const productDate = new Date(createdAt);
    const now = new Date();
    const oneWeek = 7 * 24 * 60 * 60 * 1000;
    return (now.getTime() - productDate.getTime()) < oneWeek;
  };
  
  const fetchData = async (preventLoader = false) => {
      if (!preventLoader) setLoading(true);
      try {
          // Fetch Products with variants and series
          const { data: productsData, error: productsError } = await db
              .from('products')
              .select('*, variants(*, series(*))')
              .order('created_at', { ascending: false });

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

          // Fetch Series Templates
          const { data: templatesData, error: templatesError } = await db.from('series_templates').select('*');
          if (templatesError) throw templatesError;
          const formattedTemplates = templatesData.map((t) => ({...t, id: String(t.id), name: String(t.name || ''), seriesNames: (t.series_names || []).map(String)}));
          setSeriesTemplates(formattedTemplates);
          
          // Fetch Collar Types
          const { data: collarTypesData, error: collarTypesError } = await db.from('collar_types').select('*').order('name');
          if (collarTypesError) {
              console.warn("Could not fetch collar types. Ensure 'collar_types' table exists.", collarTypesError);
          } else {
              setCollarTypes((collarTypesData || []).map((ct) => ({ ...ct, id: String(ct.id), name: String(ct.name || '') })));
          }

          // Fetch Content Templates
          const { data: contentTemplatesData, error: contentTemplatesError } = await db.from('content_templates').select('*').order('name');
          if (contentTemplatesError) {
              console.warn("Could not fetch content templates. Ensure 'content_templates' table exists.", contentTemplatesError);
          } else {
              setContentTemplates((contentTemplatesData || []).map((ct) => ({ ...ct, id: String(ct.id), name: String(ct.name || '') })));
          }

          // Fetch Gender Templates
          const { data: genderTemplatesData, error: genderTemplatesError } = await db.from('gender_templates').select('*').order('name');
          if (genderTemplatesError) {
              console.warn("Could not fetch gender templates. Ensure 'gender_templates' table exists.", genderTemplatesError);
          } else {
              setGenderTemplates((genderTemplatesData || []).map((gt) => ({ ...gt, id: String(gt.id), name: String(gt.name || '') })));
          }
          
           // Fetch Store Settings
          const { data: settingsData, error: settingsError } = await db.from('store_settings').select('*').eq('id', 1).single();
          if (settingsError) throw settingsError;
          if (settingsData) {
              setStoreSettings({
                  name: settingsData.name,
                  logo: settingsData.logo,
                  brand: settingsData.brand,
                  manufacturerTitle: settingsData.manufacturer_title,
                  origin: settingsData.origin,
                  nameColor: settingsData.name_color,
                  adminPassword: settingsData.admin_password || 'klm!44'
              });
          }

      } catch (error) {
          console.error("Error fetching data:", error);
      } finally {
          if (!preventLoader) setLoading(false);
      }
  };

  useEffect(() => {
    const setupInitialData = async () => {
        const collarTypesToAdd = [
            { name: 'Polo' },
            { name: 'Crew Neck' },
            { name: 'Button Collar' },
            { name: 'V-Neck' },
            { name: 'Shirt Collar' },
            { name: 'Mock Neck' },
            { name: 'Cardigan' },
        ];
        
        try {
            const { data, count } = await db.from('collar_types').select('*', { count: 'exact', head: true });
            if (count === 0) {
                const { error: insertError } = await db.from('collar_types').insert(collarTypesToAdd);
                if (insertError) throw insertError;
            }
        } catch (e) { console.error("Exception during initial collar type setup:", e); }
        
        const genderTemplatesToAdd = [
            { name: 'Male' }, { name: 'Female' }, { name: 'Unisex' },
            { name: 'Child' }, { name: 'Boy' }, { name: 'Girl' },
        ];
        try {
            const { data, count } = await db.from('gender_templates').select('*', { count: 'exact', head: true });
            if (count === 0) {
                const { error: insertError } = await db.from('gender_templates').insert(genderTemplatesToAdd);
                if (insertError) throw insertError;
            }
        } catch (e) { console.error("Exception during initial gender template setup:", e); }
        
        await fetchData();
    };
    setupInitialData();
  }, []);
  
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
    const isIos = () => /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || ('standalone' in window.navigator && window.navigator.standalone === true);

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
      installPrompt.prompt();
      installPrompt.userChoice.then((choiceResult) => {
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
    const sortedProducts = [...products].sort((a, b) => isNewProduct(b.created_at) - isNewProduct(a.created_at));

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

  const handleAddToCart = (series, quantity) => {
    setCartItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(item => item.series.id === series.id);
      if (existingItemIndex > -1) {
        const newItems = [...prevItems];
        newItems[existingItemIndex].quantity = Number(newItems[existingItemIndex].quantity || 0) + quantity;
        return newItems;
      } else {
        const product = products.find(p => p.variants.some(v => v.series.some(s => s.id === series.id)));
        const variant = product.variants.find(v => v.series.some(s => s.id === series.id));
        return [...prevItems, { 
            productName: product.name,
            productCode: product.code,
            discountPercentage: product.discountPercentage || 0,
            variant: { id: variant.id, colorName: variant.colorName, imageUrl: variant.imageUrl },
            series, 
            quantity 
        }];
      }
    });
  };
  
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
  
  const handleAdminToggle = () => {
      if (isAdminView) {
          setIsAdminView(false);
      } else {
          setIsPasswordModalOpen(true);
      }
  };
  
  const handlePasswordSubmit = () => {
      if (passwordInput === storeSettings.adminPassword) {
          setIsAdminView(true);
          setIsPasswordModalOpen(false);
          setPasswordInput('');
          setPasswordError('');
      } else {
          setPasswordError(t.incorrectPassword);
      }
  };

  const handleLayoutToggle = () => {
    if (!isAdminView) {
        setLayout(prevLayout => (prevLayout === 'double' ? 'gallery' : 'double'));
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
            
            // Temporarily render component to capture it
            const tempDiv = document.createElement('div');
            document.body.appendChild(tempDiv);
            
            const element = React.createElement(OrderShareImage, {
              ref: shareImageRef,
              cartItems: cartItems,
              totals: totals,
              t: t,
              storeSettings: storeSettings,
              cartStats: cartStats,
            });

            const root = createRoot(tempDiv);
            
            await new Promise(resolve => {
                root.render(element);
                // Use a short timeout to ensure the component is fully rendered with images
                setTimeout(resolve, 500);
            });
            
            if (shareImageRef.current) {
                const canvas = await html2canvas(shareImageRef.current, { useCORS: true, scale: 2 });
                const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/jpeg', 0.9));
                
                if (navigator.share && blob) {
                   const file = new File([blob], 'order.jpg', { type: 'image/jpeg' });
                   try {
                     await navigator.share({
                        title: `${storeSettings.name} Order`,
                        files: [file],
                     });
                   } catch (error) {
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
            
            const groupedByProduct = cartItems.reduce((acc, item) => {
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

            XLSX.writeFile(wb, `${storeSettings.name}_Order_${new Date().toLocaleDateString()}.xlsx`);

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

  if (loading) {
    return React.createElement("div", { className: "loader" }, "Loading...");
  }

  return (
    React.createElement(React.Fragment, null,
      React.createElement("header", { className: "app-header" },
        React.createElement("div", { className: "container" },
          React.createElement("div", { className: "header-content" },
            React.createElement("div", { className: "store-info" },
                storeSettings.logo && React.createElement("img", { src: storeSettings.logo, alt: "Store Logo", className: "store-logo-img", onClick: handleAdminToggle }),
                React.createElement("h1", { className: "store-logo", onClick: handleLayoutToggle }, storeSettings.name),
                React.createElement("h1", { className: "store-name-mobile-gallery", onClick: () => window.location.reload(), style: { color: storeSettings.nameColor || '#192A56' } }, storeSettings.name)
            ),
            !isAdminView && (
                React.createElement("div", { className: `search-bar desktop-search-bar ${isMobileSearchVisible ? 'mobile-search-bar-active' : ''}` },
                    isMobileSearchVisible && React.createElement("button", { className: "mobile-search-back-btn", onClick: () => setIsMobileSearchVisible(false) }, React.createElement(ArrowLeftIcon, null)),
                    React.createElement("div", { className: "search-input-wrapper" },
                        React.createElement(SearchIcon, { className: "search-icon" }),
                        React.createElement("input", {
                            type: "text",
                            placeholder: t.searchPlaceholder,
                            value: searchTerm,
                            onChange: (e) => setSearchTerm(e.target.value)
                        })
                    )
                )
            ),
            React.createElement("div", { className: "header-controls" },
              !isAdminView && (
                  React.createElement(React.Fragment, null,
                    React.createElement("button", { className: "mobile-search-toggle", onClick: () => setIsMobileSearchVisible(true) }, React.createElement(SearchIcon, null)),
                    shortsItems.length > 0 && React.createElement("button", { className: "btn-secondary shorts-toggle-btn", onClick: () => handleOpenShortsPlayer() }, React.createElement(VideoIcon, null)),
                    React.createElement("div", { className: "view-toggle" },
                        React.createElement("button", { className: layout === 'double' ? 'active' : '', onClick: () => handleLayoutChange('double'), title: "Double Grid" }, React.createElement(ViewGridIcon, null)),
                        React.createElement("button", { className: layout === 'gallery' ? 'active' : '', onClick: () => handleLayoutChange('gallery'), title: t.galleryView }, React.createElement(ViewGalleryIcon, null))
                    )
                  )
              ),
              React.createElement("div", { className: "language-switcher" },
                React.createElement("select", { value: language, onChange: handleLanguageChange },
                  React.createElement("option", { value: "en" }, "EN"),
                  React.createElement("option", { value: "tr" }, "TR"),
                  React.createElement("option", { value: "ru" }, "RU")
                )
              ),
              !isAdminView && (
                React.createElement("button", { className: "cart-button", onClick: () => setIsCartOpen(true) },
                    React.createElement(CartIcon, null),
                    React.createElement("span", null, t.cart),
                    cartItems.length > 0 && React.createElement("span", { className: "cart-count" }, cartItems.length)
                )
              )
            )
          )
        )
      ),
      React.createElement("main", null,
        React.createElement("div", { className: "container" },
          isAdminView ? (
            React.createElement(AdminPanel, { 
                products, 
                seriesTemplates, 
                storeSettings,
                collarTypes,
                contentTemplates,
                genderTemplates,
                onFetchData: fetchData,
                t,
                activeTab: adminActiveTab,
                onActiveTabChange: setAdminActiveTab,
                onExit: () => setIsAdminView(false)
             })
          ) : (
            layout === 'gallery' ? (
                 React.createElement(GalleryView, {
                    variants: filteredVariantsForGallery,
                    onBulkAddToCart: handleBulkAddToCart,
                    onOpenFilters: () => setIsFilterOpen(true),
                    t: t,
                    activeFilters: activeFilters,
                    seriesNameToTemplateMap: seriesNameToTemplateMap,
                    storeSettings: storeSettings,
                    onSelectOptions: (product, variant) => handleOpenModal(product, variant)
                })
            ) : (
                React.createElement("div", { className: `product-grid layout-${layout}` },
                    filteredProducts.map(product =>
                        React.createElement(ProductCard, {
                            key: product.id,
                            product: product,
                            onSelectOptions: (p, v) => handleOpenModal(p, v),
                            t: t
                        })
                    )
                )
            )
          )
        )
      ),
      React.createElement(SeriesSelectionModal, {
        isOpen: isModalOpen,
        onClose: handleCloseModal,
        productInfo: modalData?.product,
        productVariant: modalData?.variant,
        onBulkAddToCart: handleBulkAddToCart,
        t: t,
      }),
      React.createElement(CartSidebar, {
        isOpen: isCartOpen,
        onClose: () => setIsCartOpen(false),
        cartItems: cartItems,
        onRemoveItem: handleRemoveFromCart,
        onUpdateQuantity: handleUpdateQuantity,
        onShareOrder: handleShareOrder,
        isSharing: isSharing,
        cartStats: cartStats,
        t: t,
        onDownloadExcel: handleDownloadExcel,
        isDownloadingExcel: isDownloadingExcel,
      }),
      React.createElement(AdminPasswordModal, {
          isOpen: isPasswordModalOpen,
          onClose: () => setIsPasswordModalOpen(false),
          onSubmit: handlePasswordSubmit,
          password: passwordInput,
          setPassword: setPasswordInput,
          error: passwordError,
          t: t
      }),
      React.createElement(FilterSidebar, {
          isOpen: isFilterOpen,
          onClose: () => setIsFilterOpen(false),
          products: products,
          activeFilters: activeFilters,
          setActiveFilters: setActiveFilters,
          t: t
      }),
      React.createElement(ShortsPlayer, {
          isOpen: isShortsPlayerOpen,
          shortsItems: shortsItems,
          activeShortId: activeShortId,
          onClose: () => setIsShortsPlayerOpen(false)
      }),
      isA2hsBannerVisible && installPrompt && React.createElement(AddToHomeScreenBanner, {
          onInstall: handleInstallClick,
          onDismiss: handleDismissBanner,
          storeSettings: storeSettings,
          t: t
      }),
      showIosInstallHelp && React.createElement(IosInstallBanner, {
          onDismiss: handleIosDismiss,
          storeSettings: storeSettings,
          t: t
      })
    )
  );
};

const root = createRoot(document.getElementById('root'));
root.render(React.createElement(App));
