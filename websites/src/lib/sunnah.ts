import { books } from '../data/books';
import sectionsData from '../data/sections.json';
import type { Book } from '../data/types';

const sections = sectionsData as readonly string[];

export const getAllSections = (): readonly string[] => [...sections];

export const isPublished = (book: Book): boolean => book.reviewedBy.trim() !== '';


/**
 * القاعدة الأصرم بهذا الموقع (SRS.md — NFR/Error Flow):
 * كتاب فيه خلاف فقهي (hasMadhhabDispute=true) يُرفض نشره إن لم يحمل madhhabNote —
 * لا يُنشر حكم فقهي واحد كأنه المطلق عند وجود خلاف مذهبي.
 */
export const isValidForPublish = (book: Book): boolean => {
  if (!isPublished(book)) {
    return false;
  }
  if (
    book.hasMadhhabDispute &&
    (!book.madhhabNote?.trim() || book.madhhabNote.trim() === '')
  ) {
    return false;
  }
  return true;
};


export const getPublishableBooks = (): Book[] => books.filter(isValidForPublish);


export const filterBySection = (all: Book[], section: string): Book[] => all.filter((b) => b.section === section);


export const searchBooks = (query: string): Book[] => {
  const trimmed = query.trim();
  if (trimmed === '') {
    return getPublishableBooks();
  }
  return getPublishableBooks().filter(
    (b) => b.title.includes(trimmed) || b.author.includes(trimmed)
  );
};

export const getBookBySlug = (
  slug: string
): Book | undefined => books.find((b) => b.slug === slug);

