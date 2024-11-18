export const navigation = {
    categories: [
      {
        id: 'fashion',
        name: 'Fashion',
        featured: [
          {
            name: 'New Arrivals',
            href: '/',
            imageSrc: 'https://thuydungshop.vn/pub/media/wysiwyg/Aophaonu/NP05/NP05_1_.jpg',
            imageAlt: 'Models sitting back to back, wearing Basic Tee in black and bone.',
          },
          {
            name: 'Basic Tees',
            href: '/',
            imageSrc: 'https://thoitrangnamhaiphong.com/Data/images/baiviet/tu-van-chon-quan-ao-nam-cho-nguoi-gay-15038.jpeg',
            imageAlt: 'Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.',
          },
        ],
        sections: [
          {
            id: 'women',
            name: 'Women',
            items: [
              { name: 'Tops', id:"top", href: `{fashion/women/tops}` },
              { name: 'Dresses', id:"women_dress", href: '#' },
              { name: 'Women Jeans', id: 'women_jeans' },
              { name: 'Sweaters', id: 'women_sweater' },
              { name: 'T-Shirts', id: 'women_t-shirt' },
              { name: 'Jackets', id: 'women_jacket' },
            ],
          },
          {
            id: 'men',
            name: 'Men',
            items: [
              { name: 'Tops', id:"top", href: `{fashion/men/tops}` },
              { name: 'Polos', id:"men_polo", href: '#' },
              { name: 'Shirt', id: 'shirt' },
              { name: 'Sweaters', id: 'men_sweater' },
              { name: 'T-Shirts', id: 'men_t-shirt' },
              { name: 'Jackets', id: 'men_jacket' },
              { name: 'Pants', id: 'pant' },
            ],
          },
          {
            id: 'shoes',
            name: 'Shoes',
            items: [
              { name: 'Sneakers', id: 'sneaker' },
              { name: 'Running Shoes', id: 'running_shoe' },
              { name: 'Crocs', id: 'croc' },
            ],
          },
        ],
      },
      {
        id: 'electronic_devide',
        name: 'Electronic Devides',
        featured: [
          {
            name: 'Laptop',
            id: '#',
            imageSrc: 'https://laptop88.vn/media/news/2910_hinhanhmaytinhxachtay.jpg',
            imageAlt: 'Drawstring top with elastic loop closure and textured interior padding.',
          },
          {
            name: 'Iphone',
            id: '#',
            imageSrc: 'https://viendidong.com/wp-content/uploads/2021/05/hinh-anh-render-iphone-13-sap-ra-mat-viendidong.jpg',
            imageAlt:
              'Three shirts in gray, white, and blue arranged on table with same line drawing of hands and shapes overlapping on front of shirt.',
          },
        ],
        sections: [
          {
            id: 'laptop',
            name: 'Laptop',
            items: [
              { name: 'Lenovo', id: 'lenovo' },
              { name: 'Dell', id: 'dell' },
              { name: 'HP', id: 'hp' },
              { name: 'Asus', id: 'asus' },
              { name: 'Acer', id: 'acer' },
              { name: 'MSI', id: 'msi' },
              
            ],
          },
          {
            id: 'mobile_phone',
            name: 'Mobile Phone',
            items: [
              { name: 'Iphone', id: 'iphone' },
              { name: 'Samsung', id: 'samsung' },
              { name: 'Oppo', id: 'oppo' },
              { name: 'Huawei', id: 'huawei' },
            ],
          },
        ],
      },
      {
        id: 'book',
        name: 'Books',
        featured: [
          {
            name: 'History Book',
            href: '/',
            imageSrc: 'https://bvhttdl.mediacdn.vn/291773308735864832/2023/10/23/3947484833707490086212003657513483894344492n-169804629417197360076-1698070798606-16980707988131078985295.jpg',
            imageAlt: 'Models sitting back to back, wearing Basic Tee in black and bone.',
          },
          {
            name: 'Manga',
            href: '/',
            imageSrc: 'https://static.oreka.vn/800-800_8d054d88-e521-49df-b16f-ed8d6fb89117.jpg',
            imageAlt: 'Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.',
          },
        ],
        sections: [
          {
            id: 'ficton_book',
            name: 'Fiction Books',
            items: [
              { name: 'Tops', id:"top", href: `{book/fiction-book/tops}` },
              { name: 'Novels', id:"novel" },
              { name: 'Short Stories', id: 'short_stories' },
              { name: 'Poetries', id: 'poetry' },
            ],
          },
          {
            id: 'non-fiction-book',
            name: 'Non-Fiction-Books',
            items: [
              { name: 'Tops', id:"top", href: `{book/non-fiction-book/tops}` },
              { name: 'History Books', id:"history_book"},
              { name: 'Science Books', id: 'science' },
              { name: 'Psychology Books', id: 'psychology_book' },
              { name: 'Economics & Business Books', id: 'economic-business-book' },
            ],
          },
          {
            id: 'children_young_adult_book',
            name: 'Children & Young Adult Books',
            items: [
              { name: 'Mangas', id: 'manga' },
              { name: 'Manhuas', id: 'manhua' },
              { name: 'Comics', id: 'comic' },
            ],
          },
        ],
      },
    ],
  }