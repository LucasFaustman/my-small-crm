const express = require('express');
const { app } = require('firebase-admin');
const route = express.Router();
const { requireAuth, checkUser } = require('../middlewar/authMiddleware');
const taskController = require('../controllers/taskController');






//apply our checkUser function to every route
route.get('*', checkUser)


// route.get('/login', (req, res, next) => {
//     res.render('login', { title: 'Sign In', layout: 'layout/layout-WithoutNav' });
// })
// route.get('/auth-signin-cover', (req, res, next) => {
//     res.render('auth-signin-cover', { title: 'Sign In', layout: 'layout/layout-WithoutNav' });
// })
// // route.get('/signup', (req, res, next) => {
// //     res.render('signup', { title: 'Sign Up', layout: 'layout/layout-WithoutNav' });
// // })
// route.get('/auth-signup-cover',  (req, res, next) => {
//     res.render('auth-signup-cover', { title: 'Sign Up', layout: 'layout/layout-WithoutNav' });
// })
// route.get('/auth-pass-reset-basic', (req, res, next) => {
//     res.render('auth-pass-reset-basic', { title: 'Reset Password', layout: 'layout/layout-WithoutNav' });
// })
// route.get('/auth-pass-reset-cover', (req, res, next) => {
//     res.render('auth-pass-reset-cover', { title: 'Reset Password', layout: 'layout/layout-WithoutNav' });
// })
// route.get('/auth-pass-change-basic', (req, res, next) => {
//     res.render('auth-pass-change-basic', { title: 'Change Password', layout: 'layout/layout-WithoutNav' });
// })
// route.get('/auth-pass-change-cover', (req, res, next) => {
//     res.render('auth-pass-change-cover', { title: 'Change Password', layout: 'layout/layout-WithoutNav' });
// })
// route.get('/auth-offline', (req, res, next) => {
//     res.render('auth-offline', { title: 'Offline', layout: 'layout/layout-WithoutNav' });
// })
// route.get('/auth-lockscreen-basic', (req, res, next) => {
//     res.render('auth-lockscreen-basic', { title: 'Lock Screen', layout: 'layout/layout-WithoutNav' });
// })
// route.get('/auth-lockscreen-cover', (req, res, next) => {
//     res.render('auth-lockscreen-cover', { title: 'Lock Screen', layout: 'layout/layout-WithoutNav' });
// })
// route.get('/logout', (req, res, next) => {
//     res.render('logout', { title: 'Logout', layout: 'layout/layout-WithoutNav' });
// })
// route.get('/auth-logout-cover', (req, res, next) => {
//     res.render('auth-logout-cover', { title: 'Logout', layout: 'layout/layout-WithoutNav' });
// })
// route.get('/auth-success-msg-basic', (req, res, next) => {
//     res.render('auth-success-msg-basic', { title: 'Success Message', layout: 'layout/layout-WithoutNav' });
// })
// route.get('/auth-success-msg-cover', (req, res, next) => {
//     res.render('auth-success-msg-cover', { title: 'Success Message', layout: 'layout/layout-WithoutNav' });
// })
// route.get('/auth-twostep-basic', (req, res, next) => {
//     res.render('auth-twostep-basic', { title: 'Two Step Verification', layout: 'layout/layout-WithoutNav' });
// })
// route.get('/auth-twostep-cover', (req, res, next) => {
//     res.render('auth-twostep-cover', { title: 'Two Step Verification', layout: 'layout/layout-WithoutNav' });
// })
// route.get('/auth-404-basic', (req, res, next) => {
//     res.render('auth-404-basic', { title: '404 Error', layout: 'layout/layout-WithoutNav' });
// })
// route.get('/auth-404-cover', (req, res, next) => {
//     res.render('auth-404-cover', { title: '404 Error', layout: 'layout/layout-WithoutNav' });
// })
// route.get('/auth-404-alt', (req, res, next) => {
//     res.render('auth-404-alt', { title: '404 Error', layout: 'layout/layout-WithoutNav' });
// })
// route.get('/auth-500', (req, res, next) => {
//     res.render('auth-500', { title: '500 Error', layout: 'layout/layout-WithoutNav' });
// })


// axios.defaults.headers.common['authorization'] = 'Bearer ' + localStorage.getItem('jwt')


route.get('/', requireAuth, checkUser, taskController.showTasksInDashboard)
route.get('/index', requireAuth, checkUser, taskController.showTasksInDashboard)
route.get('/dashboard-analytics', requireAuth,(req, res, next) => {
    res.render('dashboard-analytics', { title: 'Analytics', page_title: 'Analytics', folder: 'Dashboards' });
})
route.get('/dashboard-crm', requireAuth,(req, res, next) => {
    res.render('dashboard-crm', { title: 'CRM', page_title: 'CRM  ', folder: 'Dashboards' });
})
route.get('/dashboard-crypto', (req, res, next) => {
    res.render('dashboard-crypto', { title: 'Crypto', page_title: 'Crypto', folder: 'Dashboards' });
})
route.get('/dashboard-projects', (req, res, next) => {
    res.render('dashboard-projects', { title: 'Projects', page_title: 'Projects', folder: 'Dashboards' });
})
route.get('/dashboard-nft', (req, res, next) => {
    res.render('dashboard-nft', { title: 'NFT Dashboard', page_title: 'NFT Dashboard', folder: 'Dashboards' });
})


route.get('/apps-calendar', (req, res, next) => {
    res.render('apps-calendar', { title: 'Calender', page_title: 'Calender', folder: 'Apps' });
})
route.get('/apps-chat', (req, res, next) => {
    res.render('apps-chat', { title: 'Chat', page_title: 'Chat', folder: 'Apps' });
})
route.get('/apps-mailbox', (req, res, next) => {
    res.render('apps-mailbox', { layout: 'layout/layout-without-bradcrumb', title: 'Mailbox', page_title: 'Mailbox', folder: 'Apps' });
})
route.get('/apps-mailbox', (req, res, next) => {
    res.render('apps-mailbox', { title: 'Mailbox', page_title: 'Mailbox', folder: 'Apps' });
})
route.get('/apps-email-basic', (req, res, next) => {
    res.render('apps-email-basic', { title: 'Basic Action', page_title: 'Basic Action', folder: 'Email' });
})
route.get('/apps-email-ecommerce', (req, res, next) => {
    res.render('apps-email-ecommerce', { title: 'Ecommerce Action', page_title: 'Ecommerce Action', folder: 'Email' });
})
route.get('/apps-ecommerce-products', (req, res, next) => {
    res.render('apps-ecommerce-products', { title: 'Products', page_title: 'Products', folder: 'Ecommerce' });
})
route.get('/apps-ecommerce-product-details', (req, res, next) => {
    res.render('apps-ecommerce-product-details', { title: 'Product Details', page_title: 'Product Details', folder: 'Ecommerce' });
})
route.get('/apps-ecommerce-add-product', (req, res, next) => {
    res.render('apps-ecommerce-add-product', { title: 'Create Product', page_title: 'Create Product', folder: 'Ecommerce' });
})
route.get('/apps-ecommerce-orders', async (req, res, next) => {
    res.render('apps-ecommerce-orders', { title: 'Orders', page_title: 'Orders', folder: 'Ecommerce' });
})
route.get('/apps-ecommerce-order-details', (req, res, next) => {
    res.render('apps-ecommerce-order-details', { title: 'Order Details', page_title: 'Order Details', folder: 'Ecommerce' });
})
route.get('/apps-ecommerce-customers', (req, res, next) => {
    res.render('apps-ecommerce-customers', { title: 'Customers', page_title: 'Customers', folder: 'Ecommerce' });
})
route.get('/apps-ecommerce-cart', (req, res, next) => {
    res.render('apps-ecommerce-cart', { title: 'Shopping Cart', page_title: 'Shopping Cart', folder: 'Ecommerce' });
})
route.get('/apps-ecommerce-checkout', (req, res, next) => {
    res.render('apps-ecommerce-checkout', { title: 'Checkout', page_title: 'Checkout', folder: 'Ecommerce' });
})
route.get('/apps-ecommerce-sellers', (req, res, next) => {
    res.render('apps-ecommerce-sellers', { title: 'Sellers', page_title: 'Sellers', folder: 'Ecommerce' });
})
route.get('/apps-ecommerce-seller-details', (req, res, next) => {
    res.render('apps-ecommerce-seller-details', { title: 'Seller Details', page_title: 'Seller Details', folder: 'Ecommerce' });
})

route.get('/apps-projects-list', (req, res, next) => {
    res.render('apps-projects-list', { title: 'Project List', page_title: 'Project List', folder: 'Projects' });
})
// route.get('/contact', (req, res, next) => {
//     res.render('contact', { layout: 'layout/layout-without-bradcrumb', title: 'Project Overview', page_title: 'Project Overview', folder: 'Projects' });
// })
route.get('/apps-projects-create', (req, res, next) => {
    res.render('apps-projects-create', { title: 'Create Project', page_title: 'Create Project', folder: 'Projects' });
})
route.get('/apps-tasks-kanban', (req, res, next) => {
    res.render('apps-tasks-kanban', { title: 'Kanban Board', page_title: 'Kanban Board', folder: 'Tasks' });
})
// route.get('/', (req, res, next) => {
//     res.render('apps-tasks-list-view', { title: 'Tasks List', page_title: 'Tasks List', folder: 'Tasks' });
// })
route.get('/apps-tasks-details', (req, res, next) => {
    res.render('apps-tasks-details', { title: 'Task Details', page_title: 'Task Details', folder: 'Tasks' });
})
route.get('/apps-crm-contacts', (req, res, next) => {
    res.render('apps-crm-contacts', { title: 'Contacts', page_title: 'Contacts', folder: 'CRM' });
})
// route.get('/companies', (req, res, next) => {
//     res.render('companies', { title: 'Companies', page_title: 'Companies', folder: 'CRM' });
// })
route.get('/apps-crm-deals', (req, res, next) => {
    res.render('apps-crm-deals', { title: 'Deals', page_title: 'Deals', folder: 'CRM' });
})
// route.get('/leads', (req, res, next) => {
//     res.render('leads', { title: 'Leads', page_title: 'Leads', folder: 'CRM' });
// })

route.get('/apps-crypto-transactions', (req, res, next) => {
    res.render('apps-crypto-transactions', { title: 'Transactions', page_title: 'Transactions', folder: 'Crypto' });
})
route.get('/apps-crypto-buy-sell', (req, res, next) => {
    res.render('apps-crypto-buy-sell', { title: 'Buy & Sell', page_title: 'Buy & Sell', folder: 'Crypto' });
})
route.get('/apps-crypto-orders', (req, res, next) => {
    res.render('apps-crypto-orders', { title: 'Orders', page_title: 'Orders', folder: 'Crypto' });
})
route.get('/apps-crypto-wallet', (req, res, next) => {
    res.render('apps-crypto-wallet', { title: 'My Wallets', page_title: 'My Wallets', folder: 'Crypto' });
})
route.get('/apps-crypto-ico', (req, res, next) => {
    res.render('apps-crypto-ico', { title: 'ICO List', page_title: 'ICO List', folder: 'Crypto' });
})
route.get('/apps-crypto-kyc', (req, res, next) => {
    res.render('apps-crypto-kyc', { title: 'KYC Application', page_title: 'KYC Application', folder: 'Crypto' });
})

route.get('/apps-invoices-list', (req, res, next) => {
    res.render('apps-invoices-list', { title: 'Invoice List', page_title: 'Invoice List', folder: 'Invoices' });
})
route.get('/apps-invoices-details', (req, res, next) => {
    res.render('apps-invoices-details', { title: 'Invoice Detail', page_title: 'Invoice Detail', folder: 'Invoices' });
})
route.get('/apps-invoices-create', (req, res, next) => {
    res.render('apps-invoices-create', { title: 'Invoice Create', page_title: 'Invoice Create', folder: 'Invoices' });
})

route.get('/apps-tickets-list', (req, res, next) => {
    res.render('apps-tickets-list', { title: 'Tickets List', page_title: 'Tickets List', folder: 'Tickets' });
})
route.get('/apps-tickets-details', (req, res, next) => {
    res.render('apps-tickets-details', { layout: 'layout/layout-without-bradcrumb', title: 'Ticket Details', page_title: 'Ticket Details', folder: 'Tickets' });
})

// NFT Market Place
route.get('/apps-nft-marketplace', (req, res, next) => {
    res.render('apps-nft-marketplace', { title: 'Marketplace', page_title: 'Marketplace', folder: 'NFT Marketplace' });
})
route.get('/apps-nft-explore', (req, res, next) => {
    res.render('apps-nft-explore', { title: 'Explore Now', page_title: 'Explore Now', folder: 'NFT Marketplace' });
})
route.get('/apps-nft-auction', (req, res, next) => {
    res.render('apps-nft-auction', { title: 'Live Auction', page_title: 'Live Auction', folder: 'NFT Marketplace' });
})
route.get('/apps-nft-item-details', (req, res, next) => {
    res.render('apps-nft-item-details', { title: 'Item Details', page_title: 'Item Details', folder: 'NFT Marketplace' });
})
route.get('/apps-nft-collections', (req, res, next) => {
    res.render('apps-nft-collections', { title: 'Collections', page_title: 'Collections', folder: 'NFT Marketplace' });
})
route.get('/apps-nft-creators', (req, res, next) => {
    res.render('apps-nft-creators', { title: 'Creators', page_title: 'Creators', folder: 'NFT Marketplace' });
})
route.get('/apps-nft-ranking', (req, res, next) => {
    res.render('apps-nft-ranking', { title: 'Ranking', page_title: 'Ranking', folder: 'NFT Marketplace' });
})
route.get('/apps-nft-wallet', (req, res, next) => {
    res.render('apps-nft-wallet', { title: 'Wallet Connect', page_title: 'Wallet Connect', folder: 'NFT Marketplace' });
})
route.get('/apps-nft-create', (req, res, next) => {
    res.render('apps-nft-create', { title: 'Create NFT', page_title: 'Create NFT', folder: 'NFT Marketplace' });
})

//
route.get('/pages-starter', (req, res, next) => {
    res.render('pages-starter', { title: 'Starter', page_title: 'Starter', folder: 'Pages' });
})
route.get('/pages-profile', (req, res, next) => {
    res.render('pages-profile', { layout: 'layout/layout-without-bradcrumb', title: 'Profile', page_title: 'Profile', folder: 'Pages' });
})
route.get('/pages-profile-settings', (req, res, next) => {
    res.render('pages-profile-settings', { layout: 'layout/layout-without-bradcrumb', title: 'Profile', page_title: 'Profile', folder: 'Pages' });
})

route.get('/pages-team', (req, res, next) => {
    res.render('pages-team', { title: 'Team', page_title: 'Team', folder: 'Pages' });
})
route.get('/pages-timeline', (req, res, next) => {
    res.render('pages-timeline', { title: 'Timeline', page_title: 'Timeline', folder: 'Pages' });
})
route.get('/pages-faqs', (req, res, next) => {
    res.render('pages-faqs', { layout: 'layout/layout-without-bradcrumb', title: 'FAQs', page_title: 'FAQs', folder: 'Pages' });
})

route.get('/pages-pricing', (req, res, next) => {
    res.render('pages-pricing', { title: 'Pricing', page_title: 'Pricing', folder: 'Pages' });
})
route.get('/pages-gallery', (req, res, next) => {
    res.render('pages-gallery', { title: 'Gallery', page_title: 'Gallery', folder: 'Pages' });
})
route.get('/pages-maintenance', (req, res, next) => {
    res.render('pages-maintenance', { layout: 'layout/layout-WithoutNav', title: 'Maintanance' });
})
route.get('/pages-coming-soon', (req, res, next) => {
    res.render('pages-coming-soon', { title: 'Maintanance', layout: 'layout/layout-WithoutNav' });
})
route.get('/pages-sitemap', (req, res, next) => {
    res.render('pages-sitemap', { title: 'Sitemap', page_title: 'Sitemap', folder: 'Pages' });
})
route.get('/pages-search-results', (req, res, next) => {
    res.render('pages-search-results', { title: 'Search Results', page_title: 'Search Results', folder: 'Pages' });
})


route.get('/ui-alerts', (req, res, next) => {
    res.render('ui-alerts', { title: 'Alerts', page_title: 'Alerts', folder: 'Base UI' });
})
route.get('/ui-badges', (req, res, next) => {
    res.render('ui-badges', { title: 'Badges', page_title: 'Badges', folder: 'Base UI' });
})
route.get('/ui-buttons', (req, res, next) => {
    res.render('ui-buttons', { title: 'Buttons', page_title: 'Buttons', folder: 'Base UI' });
})
route.get('/ui-colors', (req, res, next) => {
    res.render('ui-colors', { title: 'Colors', page_title: 'Colors', folder: 'Base UI' });
})
route.get('/ui-cards', (req, res, next) => {
    res.render('ui-cards', { title: 'Cards', page_title: 'Cards', folder: 'Base UI' });
})
route.get('/ui-carousel', (req, res, next) => {
    res.render('ui-carousel', { title: 'Carousel', page_title: 'Carousel', folder: 'Base UI' });
})
route.get('/ui-dropdowns', (req, res, next) => {
    res.render('ui-dropdowns', { title: 'Dropdowns', page_title: 'Dropdowns', folder: 'Base UI' });
})
route.get('/ui-grid', (req, res, next) => {
    res.render('ui-grid', { title: 'Grids', page_title: 'Grids', folder: 'Base UI' });
})
route.get('/ui-images', (req, res, next) => {
    res.render('ui-images', { title: 'Images', page_title: 'Images', folder: 'Base UI' });
})
route.get('/ui-tabs', (req, res, next) => {
    res.render('ui-tabs', { title: 'Tabs', page_title: 'Tabs', folder: 'Base UI' });
})
route.get('/ui-accordions', (req, res, next) => {
    res.render('ui-accordions', { title: 'Accordions', page_title: 'Accordions', folder: 'Base UI' });
})
route.get('/ui-modals', (req, res, next) => {
    res.render('ui-modals', { title: 'Modals', page_title: 'Modals', folder: 'Base UI' });
})
route.get('/ui-offcanvas', (req, res, next) => {
    res.render('ui-offcanvas', { title: 'Offcanvas', page_title: 'Offcanvas', folder: 'Base UI' });
})
route.get('/ui-placeholders', (req, res, next) => {
    res.render('ui-placeholders', { title: 'Placeholders', page_title: 'Placeholders', folder: 'Base UI' });
})
route.get('/ui-progress', (req, res, next) => {
    res.render('ui-progress', { title: 'Progress', page_title: 'Progress', folder: 'Base UI' });
})
route.get('/ui-notifications', (req, res, next) => {
    res.render('ui-notifications', { title: 'Notifications', page_title: 'Notifications', folder: 'Base UI' });
})
route.get('/ui-media', (req, res, next) => {
    res.render('ui-media', { title: 'Media Object', page_title: 'Media Object', folder: 'Base UI' });
})
route.get('/ui-embed-video', (req, res, next) => {
    res.render('ui-embed-video', { title: 'Embed Video', page_title: 'Embed Video', folder: 'Base UI' });
})
route.get('/ui-typography', (req, res, next) => {
    res.render('ui-typography', { title: 'Typography', page_title: 'Typography', folder: 'Base UI' });
})
route.get('/ui-lists', (req, res, next) => {
    res.render('ui-lists', { title: 'Lists', page_title: 'Lists', folder: 'Base UI' });
})
route.get('/ui-general', (req, res, next) => {
    res.render('ui-general', { title: 'Generals', page_title: 'Generals', folder: 'Base UI' });
})
route.get('/ui-ribbons', (req, res, next) => {
    res.render('ui-ribbons', { title: 'Ribbons', page_title: 'Ribbons', folder: 'Base UI' });
})
route.get('/ui-utilities', (req, res, next) => {
    res.render('ui-utilities', { title: 'Utilities', page_title: 'Utilities', folder: 'Base UI' });
})

route.get('/advance-ui-sweetalerts', (req, res, next) => {
    res.render('advance-ui-sweetalerts', { title: 'Sweet Alerts', page_title: 'Sweet Alerts', folder: 'Advanced UI' });
})
route.get('/advance-ui-nestable', (req, res, next) => {
    res.render('advance-ui-nestable', { title: 'Nestable List', page_title: 'Nestable List', folder: 'Advanced UI' });
})
route.get('/advance-ui-scrollbar', (req, res, next) => {
    res.render('advance-ui-scrollbar', { title: 'Scrollable', page_title: 'Scrollable', folder: 'Advanced UI' });
})
route.get('/advance-ui-animation', (req, res, next) => {
    res.render('advance-ui-animation', { title: 'Animation', page_title: 'Animation', folder: 'Advanced UI' });
})
route.get('/advance-ui-highlight', (req, res, next) => {
    res.render('advance-ui-highlight', { title: 'Highlight', page_title: 'Highlight', folder: 'Advanced UI' });
})
route.get('/advance-ui-tour', (req, res, next) => {
    res.render('advance-ui-tour', { title: 'Tour', page_title: 'Tour', folder: 'Advanced UI' });
})
route.get('/advance-ui-swiper', (req, res, next) => {
    res.render('advance-ui-swiper', { title: 'Swiper Slider', page_title: 'Swiper Slider', folder: 'Advanced UI' });
})
route.get('/advance-ui-ratings', (req, res, next) => {
    res.render('advance-ui-ratings', { title: 'Rating', page_title: 'Rating', folder: 'Advanced UI' });
})
route.get('/advance-ui-scrollspy', (req, res, next) => {
    res.render('advance-ui-scrollspy', { title: 'Scrollspy', page_title: 'Scrollspy', folder: 'Advanced UI' });
})


route.get('/widgets', (req, res, next) => {
    res.render('widgets', { title: 'Widgets', page_title: 'Widgets', folder: 'Velzon' });
})

route.get('/forms-elements', (req, res, next) => {
    res.render('forms-elements', { title: 'Basic Elements', page_title: 'Basic Elements', folder: 'Forms' });
})
route.get('/forms-select', (req, res, next) => {
    res.render('forms-select', { title: 'Form Select', page_title: 'Form Select', folder: 'Forms' });
})
route.get('/forms-checkboxs-radios', (req, res, next) => {
    res.render('forms-checkboxs-radios', { title: 'Checkboxs & Radios', page_title: 'Checkboxs & Radios', folder: 'Forms' });
})
route.get('/forms-pickers', (req, res, next) => {
    res.render('forms-pickers', { title: 'Pickers', page_title: 'Pickers', folder: 'Forms' });
})
route.get('/forms-masks', (req, res, next) => {
    res.render('forms-masks', { title: 'Input Masks', page_title: 'Input Masks', folder: 'Forms' });
})
route.get('/forms-advanced', (req, res, next) => {
    res.render('forms-advanced', { title: 'Form Advanced', page_title: 'Form Advanced', folder: 'Forms' });
})
route.get('/forms-range-sliders', (req, res, next) => {
    res.render('forms-range-sliders', { title: 'Range Sliders', page_title: 'Range Sliders', folder: 'Forms' });
})
route.get('/forms-validation', (req, res, next) => {
    res.render('forms-validation', { title: 'Forms Validation', page_title: 'Forms Validation', folder: 'Forms' });
})
route.get('/forms-wizard', (req, res, next) => {
    res.render('forms-wizard', { title: 'Wizard', page_title: 'Wizard', folder: 'Forms' });
})
route.get('/forms-editors', (req, res, next) => {
    res.render('forms-editors', { title: 'Editors', page_title: 'Editors', folder: 'Forms' });
})
route.get('/forms-file-uploads', (req, res, next) => {
    res.render('forms-file-uploads', { title: 'File Upload', page_title: 'File Upload', folder: 'Forms' });
})
route.get('/forms-layouts', (req, res, next) => {
    res.render('forms-layouts', { title: 'Form Layout', page_title: 'Form Layout', folder: 'Forms' });
})
route.get('/forms-select2', (req, res, next) => {
    res.render('forms-select2', { title: 'Select2', page_title: 'Select2', folder: 'Forms' });
})

// Tables
route.get('/tables-basic', (req, res, next) => {
    res.render('tables-basic', { title: 'Basic Tables', page_title: 'Basic Tables', folder: 'Tables' });
})
route.get('/tables-gridjs', (req, res, next) => {
    res.render('tables-gridjs', { title: 'Grid JS', page_title: 'Grid JS', folder: 'Tables' });
})
route.get('/tables-listjs', (req, res, next) => {
    res.render('tables-listjs', { title: 'List JS', page_title: 'List JS', folder: 'Tables' });
})
route.get('/tables-datatables', (req, res, next) => {
    res.render('tables-datatables', { title: 'Datatables', page_title: 'Datatables', folder: 'Tables' });
})

route.get('/charts-apex-line', (req, res, next) => {
    res.render('charts-apex-line', { title: 'Apex Line Charts', page_title: 'Line Charts', folder: 'Apexcharts' });
})
route.get('/charts-apex-area', (req, res, next) => {
    res.render('charts-apex-area', { title: 'Apex Area Charts', page_title: 'Area Charts', folder: 'Apexcharts' });
})
route.get('/charts-apex-column', (req, res, next) => {
    res.render('charts-apex-column', { title: 'Apex Column Charts', page_title: 'Column Charts', folder: 'Apexcharts' });
})
route.get('/charts-apex-bar', (req, res, next) => {
    res.render('charts-apex-bar', { title: 'Apex Bar Charts', page_title: 'Bar Charts', folder: 'Apexcharts' });
})
route.get('/charts-apex-mixed', (req, res, next) => {
    res.render('charts-apex-mixed', { title: 'Apex Mixed Charts', page_title: 'Mixed Charts', folder: 'Apexcharts' });
})
route.get('/charts-apex-timeline', (req, res, next) => {
    res.render('charts-apex-timeline', { title: 'Apex Timeline Charts', page_title: 'Timeline Charts', folder: 'Apexcharts' });
})
route.get('/charts-apex-candlestick', (req, res, next) => {
    res.render('charts-apex-candlestick', { title: 'Apex Candlestick Charts', page_title: 'Candlestick Charts', folder: 'Apexcharts' });
})
route.get('/charts-apex-boxplot', (req, res, next) => {
    res.render('charts-apex-boxplot', { title: 'Apex Boxplot Charts', page_title: 'Boxplot Charts', folder: 'Apexcharts' });
})
route.get('/charts-apex-bubble', (req, res, next) => {
    res.render('charts-apex-bubble', { title: 'Apex Bubble Charts', page_title: 'Bubble Charts', folder: 'Apexcharts' });
})
route.get('/charts-apex-scatter', (req, res, next) => {
    res.render('charts-apex-scatter', { title: 'Apex Scatter Charts', page_title: 'Scatter Charts', folder: 'Apexcharts' });
})
route.get('/charts-apex-heatmap', (req, res, next) => {
    res.render('charts-apex-heatmap', { title: 'Apex Heatmap Charts', page_title: 'Heatmap Charts', folder: 'Apexcharts' });
})
route.get('/charts-apex-treemap', (req, res, next) => {
    res.render('charts-apex-treemap', { title: 'Apex Treemap Charts', page_title: 'Treemap Charts', folder: 'Apexcharts' });
})
route.get('/charts-apex-pie', (req, res, next) => {
    res.render('charts-apex-pie', { title: 'Apex Pie Charts', page_title: 'Pie Charts', folder: 'Apexcharts' });
})
route.get('/charts-apex-radialbar', (req, res, next) => {
    res.render('charts-apex-radialbar', { title: 'Apex Radialbar Charts', page_title: 'Radialbar Charts', folder: 'Apexcharts' });
})
route.get('/charts-apex-radar', (req, res, next) => {
    res.render('charts-apex-radar', { title: 'Apex Radar Charts', page_title: 'Radar Charts', folder: 'Apexcharts' });
})
route.get('/charts-apex-polar', (req, res, next) => {
    res.render('charts-apex-polar', { title: 'Apex Polar Charts', page_title: 'Polar Charts', folder: 'Apexcharts' });
})
route.get('/charts-chartjs', (req, res, next) => {
    res.render('charts-chartjs', { title: 'Chartjs', page_title: 'Chartjs', folder: 'Charts' });
})
route.get('/charts-echarts', (req, res, next) => {
    res.render('charts-echarts', { title: 'Echarts', page_title: 'Echarts', folder: 'Charts' });
})

route.get('/icons-remix', (req, res, next) => {
    res.render('icons-remix', { title: 'Remix', page_title: 'Remix', folder: 'Icons' });
})
route.get('/icons-boxicons', (req, res, next) => {
    res.render('icons-boxicons', { title: 'Boxicons', page_title: 'Boxicons', folder: 'Icons' });
})
route.get('/icons-materialdesign', (req, res, next) => {
    res.render('icons-materialdesign', { title: 'Material Design', page_title: 'Material Design', folder: 'Icons' });
})
route.get('/icons-lineawesome', (req, res, next) => {
    res.render('icons-lineawesome', { title: 'Line Awesome', page_title: 'Line Awesome', folder: 'Icons' });
})
route.get('/icons-feather', (req, res, next) => {
    res.render('icons-feather', { title: 'Feather', page_title: 'Feather', folder: 'Icons' });
})

route.get('/maps-google', (req, res, next) => {
    res.render('maps-google', { title: 'Google Maps', page_title: 'Google Maps', folder: 'Maps' });
})
route.get('/maps-vector', (req, res, next) => {
    res.render('maps-vector', { title: 'Vector Maps', page_title: 'Vector Maps', folder: 'Maps' });
})
route.get('/maps-leaflet', (req, res, next) => {
    res.render('maps-leaflet', { title: 'Leaflet Maps', page_title: 'Leaflet Maps', folder: 'Maps' });
})




// Landing Page
route.get('/landing', (req, res, next) => {
    res.render('landing', { title: 'Landing', layout: false });
})

route.get('/layouts-vertical', (req, res, next) => {
    res.render('layouts-vertical', { layout: 'layout/layout-vertical', title: 'Vertical', page_title: 'Vertical', folder: 'Layouts' });
})
route.get('/layouts-detached', (req, res, next) => {
    res.render('layouts-detached', { layout: 'layout/layout-detached', title: 'Detached', page_title: 'Detached', folder: 'Layouts' });
})
route.get('/layouts-two-column', (req, res, next) => {
    res.render('layouts-two-column', { layout: 'layout/layout-twocolumn', title: 'Two Column', page_title: 'Two Column', folder: 'Layouts' });
})
route.get('/layouts-vertical-hovered', (req, res, next) => {
    res.render('layouts-vertical-hovered', { layout: 'layout/layout-verti-hoverd', title: 'Vertical Hovered', page_title: 'Vertical Hovered', folder: 'Layouts' });
})

// route.get('/login', (req, res, next) => {
//     res.render('Auth/login', { title: 'Login', layout: false })
// })
// route.get('/register', (req, res, next) => {
//     res.render('Auth/register', { title: 'Register', layout: false })
// })
// route.get('/forgotpassword', (req, res, next) => {
//     res.render('Auth/forgotpassword', { title: 'Register', layout: false })
// })

module.exports = route;