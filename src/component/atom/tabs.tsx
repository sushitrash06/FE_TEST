import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';

interface Post {
  id: number;
  title: string;
  date: string;
  commentCount: number;
  shareCount: number;
}

interface Category {
  name: string;
  posts: Post[];
}

interface TabsProps {
  categories: Category[];
}

const Tabs: React.FC<TabsProps> = ({ categories }) => {
  return (
    <TabGroup>
      <TabList className="flex gap-4">
        {categories.map(({ name }) => (
          <Tab
            key={name}
            className="rounded-full py-1 px-3 text-sm/6 font-semibold text-white focus:outline-none data-[selected]:bg-white/10 data-[hover]:bg-white/5 data-[selected]:data-[hover]:bg-white/10 data-[focus]:outline-1 data-[focus]:outline-white"
          >
            {name}
          </Tab>
        ))}
      </TabList>
      <TabPanels className="mt-3">
        {categories.map(({ name, posts }) => (
          <TabPanel key={name} className="rounded-xl bg-white/5 p-3">
            <ul>
              {posts.map((post) => (
                <li key={post.id} className="relative rounded-md p-3 text-sm/6 transition hover:bg-white/5">
                  <a href="#" className="font-semibold text-white">
                    <span className="absolute inset-0" />
                    {post.title}
                  </a>
                  <ul className="flex gap-2 text-white/50" aria-hidden="true">
                    <li>{post.date}</li>
                    <li aria-hidden="true">&middot;</li>
                    <li>{post.commentCount} comments</li>
                    <li aria-hidden="true">&middot;</li>
                    <li>{post.shareCount} shares</li>
                  </ul>
                </li>
              ))}
            </ul>
          </TabPanel>
        ))}
      </TabPanels>
    </TabGroup>
  );
};

export default Tabs;
