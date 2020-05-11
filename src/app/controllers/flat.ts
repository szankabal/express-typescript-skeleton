import { Flat } from "../model/flat";
import { database } from "../../lib/database";
import { Request, Response, NextFunction } from "express";
import { QueryBuilder } from "knex";


export const index = async (req: Request, res: Response) => {
  let query: QueryBuilder = database('flats').select();
  if (req.query.limit) {
    query = query.limit(req.query.limit);
  }
  if (req.query.offset) {
    query = query.offset(req.query.offset);
  }
  const flats: Array<Flat> = await query;
  res.json(flatSerializer.index(flats));
};

export const show = async (req: Request, res: Response) => {
  try {
    const flat: Flat = await database('flats').select().where({ id: req.params.id }).first();
    console.log(flat);
    if (typeof flat !== 'undefined') {
      res.json(flatSerializer.show(flat));
    } else {
      res.sendStatus(404);
    }
  } catch(error) {
    console.error(error);
    res.sendStatus(500);
  }
};

export const create = async (req: Request, res: Response) => {
  try {
    const flat: Flat = {
      title: req.body.title,
      price: req.body.price,
      floorArea: req.body.floorArea,
      country: req.body.country,
      zip: req.body.zip0,
      city: req.body.city,
      street: req.body.street
    }
    await database('flats').insert(flat);
    res.sendStatus(201);
  } catch(error) {
    console.error(error);
    res.sendStatus(500);
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const flat: Flat = await database('flats').select().where({ id: req.params.id }).first();
    if (flat) {
      const newFlat: Flat = {
        title: req.body.title,
        price: req.body.price,
        floorArea: req.body.floorArea,
        country: req.body.country,
        zip: req.body.zip0,
        city: req.body.city,
        street: req.body.street
      }
      await database('flats').update(newFlat).where({ id: req.params.id });
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  } catch(error) {
    console.error(error);
    res.sendStatus(500);
  }
}

export const destroy = async (req: Request, res: Response) => {
  try {
    const flat: Flat = await database('flats').select().where({ id: req.params.id }).first();
    if (flat) {
      await database('flats').delete().where({ id: req.params.id });
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  } catch(error) {
    console.error(error);
    res.sendStatus(500);
  }
};