export type AssignmentItem = {
  object: string;
  id: string;
  created_time: string;
  last_edited_time: string;
  cover: string | null;
  icon: string | null;
  parent: {
    type: string;
    database_id: string;
  };
  archived: boolean;
  properties: {
    Status: {
      id: string;
      type: string;
      formula: {
        type: string;
        string: string;
      };
    };
    Deadline: {
      id: string;
      type: string;
      date: {
        start: string;
        end: string | null;
      };
    };
    'Link Pengumpulan': {
      id: string;
      type: string;
      url: string | null;
    };
    Property: {
      id: string;
      type: string;
      checkbox: boolean;
    };
    'Mata Pelajaran': {
      id: string;
      type: string;
      select: {
        id: string;
        name: string;
        color: string;
      };
    };
    Keterangan: {
      id: string;
      type: string;
      rich_text: {
        type: string;
        text: {
          content: string;
          link: null | string;
        };
        annotations: {
          bold: boolean;
          italic: boolean;
          strikethrough: boolean;
          underline: boolean;
          code: boolean;
          color: string;
        };
        plain_text: string;
        href: null | string;
      }[];
    };
    'Tempat Pengumpulan': {
      id: string;
      type: string;
      select: {
        id: string;
        name: string;
        color: string;
      };
    };
    Name: {
      id: string;
      type: string;
      title: [
        {
          type: string;
          text: {
            content: string;
            link: string | null;
          };
          annotations: {
            bold: boolean;
            italic: boolean;
            strikethrough: boolean;
            underline: boolean;
            code: boolean;
            color: string;
          };
          plain_text: string;
          href: string | null;
        }
      ];
    };
  };
  url: 'https://www.notion.so/Matematika-ca33ca52eea94e8e8dfc97cb8fb5c8a3';
};

export type AssignmentsList = {
  assignments: AssignmentItem[];
};

export type BlockItem = {
  created_time: string;
  has_children: boolean;
  id: string;
  last_edited_time: string;
  object: string;
  paragraph: {
    text: {
      annotations: {
        bold: boolean;
        italic: boolean;
        strikethrough: boolean;
        underline: boolean;
        code: boolean;
        color: string;
      };
      bold: boolean;
      code: boolean;
      color: string;
      italic: boolean;
      strikethrough: boolean;
      underline: boolean;
      href: null;
      plain_text: string;
      text: {
        content: string;
        link: null | string;
        type: string;
      };
    }[];
  };
  file: {
    caption: {
      annotations: {
        bold: boolean;
        code: boolean;
        color: string;
        italic: boolean;
        strikethrough: boolean;
        underline: boolean;
      };
      href: null | string;
      plain_text: string;
      text: {
        content: string;
        link: null | string;
        type: string;
      };
    }[];
    file: {
      expiry_time: string;
      url: string;
      type: string;
    };
  };
  type: string;
};
