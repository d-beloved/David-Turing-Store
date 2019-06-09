import {
  category,
  department,
  shipping_region,
  shipping,
  attribute,
  attribute_value,
  product
} from "../../src/models";
// seed data that will be used to test the controllers, middleware, utils and the database.

export const Attributes = () => {
  return attribute.bulkCreate([
    {
      attribute_id: 1,
      name: "Size"
    },
    {
      attribute_id: 2,
      name: "Color"
    }
  ]);
}

export const AttributeValues = () => {
  return attribute_value.bulkCreate([
    {
      attribute_value_id: 1,
      attribute_id: 1,
      value: "S"
    },
    {
      attribute_value_id: 2,
      attribute_id: 1,
      value: "L"
    },
    {
      attribute_value_id: 3,
      attribute_id: 2,
      value: "Blue"
    },
    {
      attribute_value_id: 4,
      attribute_id: 2,
      value: "Indigo"
    }
  ])
};

export const Categories = () => {
  return category.bulkCreate([
    {
      category_id: 7,
      department_id: 1,
      name: "Valentine's",
      description:
        "For the more timid, all you have to do is wear your heartfelt message to get it across. Buy one for you and your sweetie(s) today!"
    },
    {
      category_id: 6,
      department_id: 1,
      name: "Christmas",
      description:
        "Because this is a unique Christmas T-shirt that you'll only wear a few times a year, it will probably last for decades (unless some grinch nabs it from you, of course). Far into the future, after you're gone, your grandkids will pull it out and argue over who gets to wear it. What great snapshots they'll make dressed in Grandpa or Grandma's incredibly tasteful and unique Christmas T-shirt! Yes, everyone will remember you forever and what a silly goof you were when you would wear only your Santa beard and cap so you wouldn't cover up your nifty T-shirt."
    },
    {
      category_id: 5,
      department_id: 1,
      name: "Flower",
      description:
        "These unique and beautiful flower T-shirts are just the item for the gardener, flower arranger, florist, or general lover of things beautiful. Surprise the flower in your life with one of the beautiful botanical T-shirts or just get a few for yourself!"
    }
  ]);
}

export const customer1 = {
  name: "CodeMantra",
  email: "codedave@gmail.com",
  password: "passwordToRemeember"
};

export const wrongCustomer = {
  name: "CodeMantra",
  email: "codedave@gmail.com",
  password: "passw"
};

export const signinInfo = {
  email: "codedave@gmail.com",
  password: "passwordToRemeember"
};

export const wrongSigninInfo = {
  email: "codedave@gmail.com",
  password: "passw"
};

export const departments = () => {
  return department.bulkCreate([
    {
      department_id: 1,
      name: "Regional",
      description:
        "Proud of your country? Wear a T-shirt with a national symbol stamp!",
     }
  ]);
};

export const order = [
  {
    status: "0",
    order_id: 3,
    created_on: "2019-05-11T16:07:03.361Z",
    customer_id: 2,
    shipping_id: "2",
    tax_id: "2"
  }
]

export const products = () => {
  return product.bulkCreate([
    {
      product_id: 61,
      name: "Baby Seal",
      description: "Ahhhhhh! This little harp seal would!",
      price: "21.00",
      discounted_price: "18.99",
      image: "baby-seal.gif",
      image_2: "baby-seal-2.gif",
      thumbnail: "baby-seal-thumbnail.gif",
      display: 2
    },
    {
      product_id: 53,
      name: "Baby Seal",
      description: "Ahhhhhh! little harp seal would!",
      price: "20.00",
      discounted_price: "18.99",
      image: "suvla-bay-2.gif",
      image_2: "suvla-bay-2.gif",
      thumbnail: "suvla-bay-2.gif-thumbnail.gif",
      display: 0
    }
  ]);
}

export const shippings = () => {
  return shipping.bulkCreate([
    {
      shipping_id: 1,
      shipping_type: "Next Day Delivery ($20)",
      shipping_cost: "20.00",
      shipping_region_id: 2
    },
    {
      shipping_id: 2,
      shipping_type: "3-4 Days ($10)",
      shipping_cost: "10.00",
      shipping_region_id: 2
    },
    {
      shipping_id: 3,
      shipping_type: "7 Days ($5)",
      shipping_cost: "5.00",
      shipping_region_id: 2
    }
  ]);
}

export const shipping_regions = () => {
  return shipping_region.bulkCreate([
    {
      shipping_region_id: 1,
      shipping_region: 'US/Canada'
    },
    {
      shipping_region_id: 2,
      shipping_region: 'Europe'
    }
  ])
}
