import css from './layout.module.css';

interface IFilteredNotesLayout {
  sidebar: React.ReactNode;
  children: React.ReactNode;
}

const FilteredNotesLayout = ({ sidebar, children }: IFilteredNotesLayout) => {
  return (
    <>
      <aside className={css.sidebar}>{sidebar}</aside>
      <div className={css.notesWrapper}>{children}</div>
    </>
  );
};

export default FilteredNotesLayout;
