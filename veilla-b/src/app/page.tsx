import { notFound } from "next/navigation";
import { AcquireTicket } from "@/components/commerce/acquire-ticket";
import { GalleryWalk } from "@/components/exhibit/gallery-walk";
import { RitualScore, TakeItHome, VisitorQuestions, VisitorsBook } from "@/components/home/after-walk";
import { EntranceRoom, GestureRoom, MaterialsRoom, NoteRoom, ObjectRoom } from "@/components/home/walk-rooms";
import { KIT_HANDLE, catalog } from "@/lib/commerce";

export default async function ExhibitionPage() {
  const product = await catalog.getProduct(KIT_HANDLE);
  if (!product) notFound();

  return (
    <>
      <GalleryWalk>
        <EntranceRoom product={product} />
        <NoteRoom />
        <ObjectRoom />
        <GestureRoom />
        <MaterialsRoom />
      </GalleryWalk>
      <RitualScore />
      <VisitorsBook />
      <VisitorQuestions />
      <TakeItHome product={product} />
      <AcquireTicket product={product} />
    </>
  );
}
