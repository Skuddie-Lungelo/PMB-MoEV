// Utility functions to load content from JSON files

export interface AboutContent {
  hero: {
    title: string;
    subtitle: string;
    description: string;
  };
  story: {
    title: string;
    content: string;
  };
  mission: {
    title: string;
    content: string;
  };
  vision: {
    title: string;
    content: string;
  };
  values: Array<{
    title: string;
    description: string;
  }>;
}

export interface ContactContent {
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    full: string;
  };
  phone: string;
  email: string;
  website: string;
  serviceTime: {
    sunday: {
      morning: string;
      evening: string;
    };
    wednesday: {
      prayer: string;
    };
  };
  socialMedia: {
    facebook: string;
    instagram: string;
    youtube: string;
  };
  officeHours: {
    weekdays: string;
    saturday: string;
    sunday: string;
  };
}

export interface ChurchInfo {
  churchName: string;
  denomination: string;
  founded: string;
  pastorMessage: string;
  detailedBeliefs: {
    [key: string]: {
      title: string;
      content: string;
    };
  };
  ministries: Array<{
    name: string;
    description: string;
  }>;
  frequentlyAskedQuestions: Array<{
    question: string;
    answer: string;
  }>;
  communityInvolvement: Array<{
    program: string;
    description: string;
  }>;
  churchHistory: string;
  pastoralCare: string;
  smallGroups: string;
}

// Load content functions
export const loadAboutContent = async (): Promise<AboutContent> => {
  try {
    const response = await fetch('/content/about.json');
    return await response.json();
  } catch (error) {
    console.error('Error loading about content:', error);
    // Return default content if file fails to load
    return {
      hero: {
        title: "Welcome to Living Hope Church",
        subtitle: "A community of faith, hope, and love",
        description: "Join us in our journey of faith and community."
      },
      story: {
        title: "Our Story",
        content: "We are a welcoming church community."
      },
      mission: {
        title: "Our Mission",
        content: "To share God's love with our community."
      },
      vision: {
        title: "Our Vision",
        content: "A community transformed by faith."
      },
      values: []
    };
  }
};

export const loadContactContent = async (): Promise<ContactContent> => {
  try {
    const response = await fetch('/content/contact.json');
    return await response.json();
  } catch (error) {
    console.error('Error loading contact content:', error);
    return {
      address: {
        street: "123 Hope Street",
        city: "Springfield",
        state: "State",
        zipCode: "12345",
        full: "123 Hope Street, Springfield, State 12345"
      },
      phone: "(555) 123-HOPE",
      email: "info@livinghopechurch.org",
      website: "www.livinghopechurch.org",
      serviceTime: {
        sunday: { morning: "10:00 AM", evening: "6:00 PM" },
        wednesday: { prayer: "7:00 PM" }
      },
      socialMedia: {
        facebook: "facebook.com/livinghopechurch",
        instagram: "@livinghopechurch",
        youtube: "youtube.com/livinghopechurch"
      },
      officeHours: {
        weekdays: "9:00 AM - 5:00 PM",
        saturday: "By Appointment",
        sunday: "Closed"
      }
    };
  }
};

export const loadChurchInfo = async (): Promise<ChurchInfo> => {
  try {
    const response = await fetch('/content/church-info.json');
    return await response.json();
  } catch (error) {
    console.error('Error loading church info:', error);
    return {
      churchName: "Living Hope Church",
      denomination: "Independent Christian Church",
      founded: "2010",
      pastorMessage: "Welcome to our church family!",
      detailedBeliefs: {},
      ministries: [],
      frequentlyAskedQuestions: [],
      communityInvolvement: [],
      churchHistory: "Our church has a rich history of serving the community.",
      pastoralCare: "We provide caring support to our members.",
      smallGroups: "Small groups are an important part of our community."
    };
  }
};